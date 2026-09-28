import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "@/shared/lib/apiUrl";
import type { Credentials } from "./types";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = (args, api, extra) => {
  const { idInstance, apiTokenInstance } = (
    api.getState() as { auth: Credentials }
  ).auth;
  const req = typeof args === "string" ? { url: args } : args;

  return fetchBaseQuery({ baseUrl: getApiUrl(idInstance) })(
    {
      ...req,
      url: `waInstance${idInstance}/${req.url.replace(":token", apiTokenInstance)}`,
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
