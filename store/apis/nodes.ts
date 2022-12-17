import {
  INode,
  INodeData,
  INodeExecutionData,
  INodeOptionsValue,
  ITestNodeBody,
  ITriggerNode,
  WebhookMethod,
} from "utils/interfaces";
import { emptySplitApi } from ".";

export type AllNodesResponse = Array<SpecificNodeResponse>;
type SpecificNodeResponse = INode | ITriggerNode;
type LoadMethodNodeResponse = Array<INodeOptionsValue>;
type TestNodeResponse =
  | Array<INodeExecutionData>
  | {
      webhookEndPoint: any;
      httpMethod: WebhookMethod;
    };

interface ILoadMethodNodeArgs {
  name: string;
  body: INodeData;
}
interface ITestNodeArgs {
  name: string;
  body: ITestNodeBody;
}

export const nodesApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNodes: builder.query<AllNodesResponse, void>({
      query: () => "nodes",
    }),

    getSpecificNode: builder.query<SpecificNodeResponse, string>({
      query: (name) => `/nodes/${name}`,
    }),

    loadMethodNode: builder.mutation<
      LoadMethodNodeResponse,
      ILoadMethodNodeArgs
    >({
      query: ({ name, ...body }) => ({
        url: `/node-load-method/${name}`,
        body,
      }),
    }),

    testNode: builder.mutation<TestNodeResponse, ITestNodeArgs>({
      query: ({ name, ...body }) => ({
        url: `/node-test/${name}`,
        body,
      }),
    }),

    removeTestTriggers: builder.mutation<void, void>({
      query: () => ({
        url: `/remove-test-triggers`,
      }),
    }),
  }),

  overrideExisting: false,
});

// use in function components
export const {
  useGetAllNodesQuery,
  useGetSpecificNodeQuery,
  useLoadMethodNodeMutation,
  useTestNodeMutation,
  useRemoveTestTriggersMutation,
  util: {
    getRunningQueriesThunk: getRunningNodeQueries,
    getRunningMutationsThunk,
  },
} = nodesApi;

export const {
  getAllNodes,
  getSpecificNode,
  loadMethodNode,
  testNode,
  removeTestTriggers,
} = nodesApi.endpoints;
