import {
  ICredential,
  INodeCredential,
  IWalletResponse,
} from "utils/interfaces";
import { emptySplitApi } from "..";

export const credentialsApi = emptySplitApi.injectEndpoints({
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
  overrideExisting: false,
});

// use in function components
export const {
  useCreateNewCredentialMutation,
  useDeleteCredentialMutation,
  useGetCredentialParamsMutation,
  useUpdateCredentialMutation,
  useGetCredentialsQuery,
  useGetSpecificCredentialQuery,
} = credentialsApi;

export const {
  getCredentials,
  getSpecificCredential,
  updateCredential,
  deleteCredential,
  createNewCredential,
  getCredentialParams,
} = credentialsApi.endpoints;
