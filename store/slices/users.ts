import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import type { User } from "utils/types";

type UsersResponse = Array<User>;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => `users`,
    }),
  }),
});

// use in function components
export const {
  useGetUsersQuery,
  util: { getRunningQueriesThunk },
} = userApi;

// use for ssr
export const { getUsers } = userApi.endpoints;
