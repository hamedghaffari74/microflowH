import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { backendApiBaseURL as baseUrl } from "utils/constants";
import { ITestWorkflowBody, IWorkflowResponse } from "utils/interfaces";

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

export const workflowsApi = createApi({
  reducerPath: "workflowsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Workflows"],

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

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

    getSpecificWorkflow: builder.query<IWorkflowResponse, string>({
      query: (shortId) => `/workflows/${shortId}`,
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
});

export const {
  useGetAllWorkflowsQuery,
  useGetSpecificWorkflowQuery,
  useCreateNewWorkflowMutation,
  useDeployWorkflowMutation,
  useTestWorkflowMutation,
  useUpdateWorkflowMutation,
  useDeleteWorkflowMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = workflowsApi;

export const {
  createNewWorkflow,
  deployWorkflow,
  getAllWorkflows,
  getSpecificWorkflow,
  updateWorkflow,
  deleteWorkflow,
} = workflowsApi.endpoints;
