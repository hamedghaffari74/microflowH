import { Edge, Node } from "reactflow";
import {
  INodeData,
  ITestWorkflowBody,
  IWorkflowResponse,
} from "utils/interfaces";
import { emptySplitApi } from "..";

interface IModifyWorkflowArgs {
  name: string;
  flowData: string;
  shortId?: string;
}

interface ICreateWorkflowArgs extends IModifyWorkflowArgs {
  deployed: false;
}

interface IDeployWorkflowArgs {
  shortId: string;
  halt: boolean;
}

interface ITestWorkflowArgs extends ITestWorkflowBody {
  startingNodeId: string;
}

type AllWorkflowsResponse = Array<IWorkflowResponse>;

export type IAugmentedWorkflowResponse = IWorkflowResponse & {
  edges: Array<Edge>;
  nodes: Array<Node<INodeData>>;
};

const taggedApi = emptySplitApi.enhanceEndpoints({
  addTagTypes: ["Workflows"],
});

export const workflowsApi = taggedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkflows: builder.query<AllWorkflowsResponse, void>({
      query: () => "workflows",

      // this will auto refetch when workflows have been modified
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(
              ({ shortId }) => ({ type: "Workflows", shortId } as const)
            ),
            { type: "Workflows", id: "LIST" },
          ];
        } else {
          return [{ type: "Workflows", id: "LIST" }];
        }
      },
    }),

    getSpecificWorkflow: builder.query<IAugmentedWorkflowResponse, string>({
      query: (shortId) => `/workflows/${shortId}`,
      transformResponse: (response: IWorkflowResponse) => {
        if (response?.flowData) {
          const parsed = JSON.parse(response.flowData);
          return {
            ...response,
            nodes: parsed.nodes || [],
            edges: parsed.edges || [],
          };
        }

        return response as IAugmentedWorkflowResponse;
      },
      providesTags: (result, error, id) => [{ type: "Workflows", id }],
    }),

    createNewWorkflow: builder.mutation<IWorkflowResponse, ICreateWorkflowArgs>(
      {
        query: (body) => ({ url: "/workflows", body, method: "POST" }),
        invalidatesTags: [{ type: "Workflows", id: "LIST" }],
      }
    ),

    updateWorkflow: builder.mutation<
      IWorkflowResponse | undefined,
      IModifyWorkflowArgs
    >({
      query: ({ shortId, ...workFlow }) => ({
        url: `/workflows/${shortId}`,
        method: "PUT",
        body: workFlow,
      }),

      // any request to this specific workflow will be rerun. ex:
      // getSpecificWorkflow(shortId) is the one being updated
      invalidatesTags: (result, error, { shortId }) => [
        { type: "Workflows", id: shortId },
      ],
    }),

    deployWorkflow: builder.mutation<
      IWorkflowResponse | undefined,
      IDeployWorkflowArgs
    >({
      query: ({ shortId, ...body }) => ({
        url: `/workflows/deploy/${shortId}`,
        body: body || {},
      }),
    }),

    testWorkflow: builder.mutation<undefined, ITestWorkflowArgs>({
      query: ({ startingNodeId, ...body }) => ({
        url: `/workflows/test/${startingNodeId}`,
        body,
      }),
    }),

    deleteWorkflow: builder.mutation<undefined, string>({
      query: (shortId) => ({
        url: `/workflows/${shortId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Workflows", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllWorkflowsQuery,
  useGetSpecificWorkflowQuery,
  useCreateNewWorkflowMutation,
  useDeployWorkflowMutation,
  useTestWorkflowMutation,
  useUpdateWorkflowMutation,
  useDeleteWorkflowMutation,
} = workflowsApi;

export const {
  createNewWorkflow,
  deployWorkflow,
  getAllWorkflows,
  getSpecificWorkflow,
  updateWorkflow,
  deleteWorkflow,
} = workflowsApi.endpoints;
