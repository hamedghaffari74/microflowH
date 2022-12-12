import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { backendApiBaseURL as baseUrl } from "utils/constants";
import { IContract, IContractRequestBody } from "utils/interfaces";

type AllContractsResponse = Array<IContract>;

export const contractsApi = createApi({
  reducerPath: "executionsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    getAllContracts: builder.query<AllContractsResponse, void>({
      query: () => "/contracts",
    }),

    getSpecificContract: builder.query<IContract, Pick<IContract, "_id">>({
      query: (id) => `/contracts/${id}`,
    }),

    createNewContract: builder.mutation<IContract, IContract>({
      query: (body) => ({
        url: `/ contracts`,
        body,
      }),
    }),

    updateContract: builder.mutation<IContract, IContract>({
      query: (body) => ({
        url: `/executions/${body._id}`,
        method: "PUT",
        body,
      }),
    }),

    getContractABI: builder.mutation<any, IContractRequestBody>({
      query: (body) => ({
        url: `/contracts/getabi`,
        body,
      }),
    }),

    deleteContract: builder.mutation<IContract, Pick<IContract, "_id">>({
      query: (id) => ({
        url: `/contracts/${id}`,
      }),
    }),
  }),
});

// use in function components
export const {
  useCreateNewContractMutation,
  useDeleteContractMutation,
  useGetContractABIMutation,
  useUpdateContractMutation,
  useGetAllContractsQuery,
  useGetSpecificContractQuery,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = contractsApi;

export const {
  getContractABI,
  getAllContracts,
  getSpecificContract,
  deleteContract,
  updateContract,
  createNewContract,
} = contractsApi.endpoints;
