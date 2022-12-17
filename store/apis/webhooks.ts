import { emptySplitApi } from ".";

export const webhooksApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAllTestWebhooks: builder.mutation<void, void>({
      query: () => ({
        url: "/remove-test-webhooks",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteAllTestWebhooksMutation } = webhooksApi;
export const { deleteAllTestWebhooks } = webhooksApi.endpoints;
