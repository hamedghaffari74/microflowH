import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import {
  INode,
  INodeData,
  INodeExecutionData,
  INodeOptionsValue,
  ITestNodeBody,
  ITriggerNode,
  WebhookMethod,
} from "utils/interfaces";

import { backendApiBaseURL } from "utils/constants";

type AllNodesResponse = Array<INode | ITriggerNode>;
type SpecificNodeResponse = INode | ITriggerNode;
type LoadMethodNodeResponse = Array<INodeOptionsValue>;
type TestNodeResponse =
  | Array<INodeExecutionData>
  | {
      webhookEndPoint: any;
      httpMethod: WebhookMethod;
    };

interface TestNodeArgs {
  name: string;
  body: ITestNodeBody;
}

interface LoadMethodNodeArgs {
  name: string;
  body: INodeData;
}

export const nodesApi = createApi({
  reducerPath: "nodesApi",
  baseQuery: fetchBaseQuery({ baseUrl: backendApiBaseURL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAllNodes: builder.query<AllNodesResponse, void>({
      query: () => "nodes",
    }),

    getSpecificNode: builder.query<SpecificNodeResponse, string>({
      query: (name) => `/nodes/${name}`,
    }),

    loadMethodNode: builder.mutation<
      LoadMethodNodeResponse,
      LoadMethodNodeArgs
    >({
      query: ({ name, ...body }) => ({
        url: `/node-load-method/${name}`,
        body,
      }),
    }),

    testNode: builder.mutation<TestNodeResponse, TestNodeArgs>({
      query: ({ name, ...body }) => ({
        url: `/node-test/${name}`,
        body,
      }),
    }),

    removeTestTriggers: builder.mutation<void, null>({
      query: () => ({
        url: `/remove-test-triggers`,
      }),
    }),
  }),
});

// use in function components
export const {
  useGetAllNodesQuery,
  useGetSpecificNodeQuery,
  useLoadMethodNodeMutation,
  useTestNodeMutation,
  useRemoveTestTriggersMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = nodesApi;

export const {
  getAllNodes,
  getSpecificNode,
  loadMethodNode,
  testNode,
  removeTestTriggers,
} = nodesApi.endpoints;
