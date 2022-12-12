import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { backendApiBaseURL as baseUrl } from "utils/constants";
import {
  ITestWorkflowBody,
  IWorkflow,
  IWorkflowResponse,
} from "utils/interfaces";

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

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    getAllWorkflows: builder.query<AllWorkflowsResponse, void>({
      query: () => "workflows",
    }),

    getSpecificWorkflow: builder.query<
      IWorkflowResponse,
      Pick<IWorkflow, "shortId">
    >({
      query: (shortId) => `/workflows/${shortId}`,
    }),

    createNewWorkflow: builder.mutation<IWorkflowResponse, IWorkflow>({
      query: (body) => ({ url: "/workflows", body }),
    }),

    updateWorkflow: builder.mutation<IWorkflowResponse | undefined, IWorkflow>({
      query: (workFlow) => ({
        url: `/workflows/${workFlow.shortId}`,
        method: "PUT",
        body: workFlow,
      }),
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

    deleteWorkflow: builder.mutation<undefined, Pick<IWorkflow, "shortId">>({
      query: (shortId) => ({
        url: `/workflows/${shortId}`,
        method: "DELETE",
      }),
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
} = workflowsApi;

export const {
  createNewWorkflow,
  deployWorkflow,
  getAllWorkflows,
  getSpecificWorkflow,
  updateWorkflow,
  deleteWorkflow,
} = workflowsApi.endpoints;
