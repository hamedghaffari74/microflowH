import { ICommonObject, IWallet, IWalletResponse } from "utils/interfaces";
import { emptySplitApi } from ".";

type AllWalletsResponse = Array<IWallet>;

export const walletsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWallets: builder.query<AllWalletsResponse, void>({
      query: () => "/wallets",
    }),

    getSpecificWallet: builder.query<IWalletResponse, Pick<IWallet, "_id">>({
      query: (id) => `/wallets/${id}`,
    }),

    createNewWallet: builder.mutation<IWallet, IWallet>({
      query: (body) => ({
        url: `/wallets`,
        body,
      }),
    }),

    updateWallet: builder.mutation<IWallet, IWallet>({
      query: (body) => ({
        url: `/wallets/${body._id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteWallet: builder.mutation<IWallet, Pick<IWallet, "_id">>({
      query: (id) => ({ url: `/wallets/${id}` }),
    }),

    getWalletCredential: builder.mutation<ICommonObject, Pick<IWallet, "_id">>({
      query: (id) => ({ url: `/wallets/credential/${id}` }),
    }),
  }),
  overrideExisting: false,
});

// use in function components
export const {
  useCreateNewWalletMutation,
  useDeleteWalletMutation,
  useGetWalletCredentialMutation,
  useUpdateWalletMutation,
  useGetAllWalletsQuery,
  useGetSpecificWalletQuery,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = walletsApi;

export const {
  getAllWallets,
  getSpecificWallet,
  updateWallet,
  deleteWallet,
  createNewWallet,
  getWalletCredential,
} = walletsApi.endpoints;
