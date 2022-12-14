import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { backendApiBaseURL as baseUrl } from "utils/constants";
import {
  ICredential,
  INodeCredential,
  IWalletResponse,
} from "utils/interfaces";

export const credentialsApi = createApi({
  reducerPath: "credentialsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    getCredentials: builder.query<
      ICredential,
      Pick<ICredential, "nodeCredentialName">
    >({
      query: (nodeCredentialName) => ({
        url: "/credentials",
        params: { nodeCredentialName },
      }),
    }),

    getSpecificCredential: builder.query<
      IWalletResponse,
      Pick<ICredential, "_id"> & { isEncrypted: boolean }
    >({
      query: ({ _id, isEncrypted }) => ({
        url: `/credentials/${_id}`,
        params: { isEncrypted },
      }),
    }),

    createNewCredential: builder.mutation<ICredential, ICredential>({
      query: (body) => ({
        url: `/credentials`,
        body,
      }),
    }),

    updateCredential: builder.mutation<ICredential, ICredential>({
      query: (body) => ({
        url: `/credentials/${body._id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteCredential: builder.mutation<ICredential, Pick<ICredential, "_id">>({
      query: (id) => ({ url: `/credentials/${id}` }),
    }),

    getCredentialParams: builder.mutation<
      INodeCredential,
      Pick<INodeCredential, "name">
    >({
      query: (name) => ({ url: `/node-credentials/${name}` }),
    }),
  }),
});

// use in function components
export const {
  useCreateNewCredentialMutation,
  useDeleteCredentialMutation,
  useGetCredentialParamsMutation,
  useUpdateCredentialMutation,
  useGetCredentialsQuery,
  useGetSpecificCredentialQuery,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = credentialsApi;

export const {
  getCredentials,
  getSpecificCredential,
  updateCredential,
  deleteCredential,
  createNewCredential,
  getCredentialParams,
} = credentialsApi.endpoints;
