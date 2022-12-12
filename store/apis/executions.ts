import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { backendApiBaseURL as baseUrl } from "utils/constants";
import { IExecution } from "utils/interfaces";

type AllExecutionsResponse = Array<IExecution>;

export const executionsApi = createApi({
  reducerPath: "executionsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
});

// use in function components
export const {
  useCreateNewExecutionMutation,
  useDeleteExecutionMutation,
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
