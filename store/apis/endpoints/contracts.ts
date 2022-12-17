import { IContract, IContractRequestBody } from "utils/interfaces";
import { emptySplitApi } from "..";

type AllContractsResponse = Array<IContract>;

export const contractsApi = emptySplitApi.injectEndpoints({
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
  overrideExisting: false,
});

// use in function components
export const {
  useCreateNewContractMutation,
  useDeleteContractMutation,
  useGetContractABIMutation,
  useUpdateContractMutation,
  useGetAllContractsQuery,
  useGetSpecificContractQuery,
} = contractsApi;

export const {
  getContractABI,
  getAllContracts,
  getSpecificContract,
  deleteContract,
  updateContract,
  createNewContract,
} = contractsApi.endpoints;
