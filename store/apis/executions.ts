import { IExecution } from "utils/interfaces";
import { emptySplitApi } from ".";

type AllExecutionsResponse = Array<IExecution>;

export const executionsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExecutions: builder.query<AllExecutionsResponse, void>({
      query: () => "/executions",
    }),

    getSpecificExecution: builder.query<
      IExecution,
      Pick<IExecution, "shortId">
    >({
      query: (shortId) => `/executions/${shortId}`,
    }),

    createNewExecution: builder.mutation<IExecution, IExecution>({
      query: (body) => ({
        url: `/executions`,
        body,
      }),
    }),

    updateExecution: builder.mutation<IExecution, IExecution>({
      query: (body) => ({
        url: `/executions/${body.shortId}`,
        method: "PUT",
        body,
      }),
    }),

    deleteExecution: builder.mutation<IExecution, Pick<IExecution, "shortId">>({
      query: (shortId) => ({
        url: `/executions/${shortId}`,
      }),
    }),
  }),
  overrideExisting: false,
});

// use in function components
export const {
  useCreateNewExecutionMutation,
  useDeleteExecutionMutation,
  useUpdateExecutionMutation,
  useGetAllExecutionsQuery,
  useGetSpecificExecutionQuery,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = executionsApi;

export const {
  getAllExecutions,
  getSpecificExecution,
  deleteExecution,
  updateExecution,
  createNewExecution,
} = executionsApi.endpoints;
