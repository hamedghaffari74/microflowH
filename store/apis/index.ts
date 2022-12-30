import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { BACKEND_API_BASE_URL as baseUrl } from "utils/constants";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export const {
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = emptySplitApi;
