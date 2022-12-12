import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { backendApiBaseURL as baseUrl } from "utils/constants";

export const webhooksApi = createApi({
  reducerPath: "webhooksApi",
  baseQuery: fetchBaseQuery({ baseUrl }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    deleteAllTestWebhooks: builder.mutation({
      query: () => ({
        url: "/remove-test-webhooks",
      }),
    }),
  }),
});

export const { useDeleteAllTestWebhooksMutation } = webhooksApi;
export const { deleteAllTestWebhooks } = webhooksApi.endpoints;
