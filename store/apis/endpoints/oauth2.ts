import { emptySplitApi } from "..";

export const oauth2Api = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getOAuth2RedirectURL: builder.query<string, void>({
      query: () => "/oauth2-redirecturl",
    }),

    getOAuth2PopupURL: builder.query<string, string>({
      query: (credentialId) => ({
        url: `/oauth2`,
        params: { credentialId },
      }),
    }),
  }),
  overrideExisting: false,
});

// use in function components
export const { useGetOAuth2PopupURLQuery, useGetOAuth2RedirectURLQuery } =
  oauth2Api;

export const { getOAuth2PopupURL, getOAuth2RedirectURL } = oauth2Api.endpoints;
