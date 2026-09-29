import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "@/shared/lib/apiUrl";
import type { Credentials } from "./types";

interface RequestArgs extends FetchArgs {
  greenApiCredentials?: Credentials;
}

const baseQuery: BaseQueryFn<
  string | RequestArgs,
  unknown,
  FetchBaseQueryError
> = (args, api, extra) => {
  const req = typeof args === "string" ? { url: args } : args;
  const creds =
    req.greenApiCredentials ?? (api.getState() as { auth: Credentials }).auth;

  return fetchBaseQuery({ baseUrl: getApiUrl(creds.idInstance) })(
    {
      ...req,
      url: `waInstance${creds.idInstance}/${req.url.replace(":token", creds.apiTokenInstance)}`,
    },
    api,
    extra,
  );
};

export const greenApi = createApi({
  reducerPath: "greenApi",
  baseQuery,
  endpoints: () => ({}),
});
