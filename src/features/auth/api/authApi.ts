import { greenApi } from "@/shared/api/greenApi";
import type { Credentials } from "@/shared/api/types";

interface StateInstanceRes {
  stateInstance: string;
}

export const authApi = greenApi.injectEndpoints({
  endpoints: (build) => ({
    checkCredentials: build.query<StateInstanceRes, Credentials>({
      query: (greenApiCredentials) => ({
        url: "getStateInstance/:token",
        greenApiCredentials,
      }),
    }),
  }),
});

export const { useLazyCheckCredentialsQuery } = authApi;
