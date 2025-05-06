/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../auth/authSlice";
import { toast } from "sonner";
import { TResponse } from "@/types/type";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://book-shop-server-ecru.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

//implementing a customBaseQuery

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = (await baseQuery(args, api, extraOptions)) as TResponse<any>;

  if (result?.error?.status === 404) {
    toast.error(result?.error?.data?.message);
  }
  if (result?.error?.status === 403) {
    toast.error(result?.error?.data?.message);
  }

  if (result?.error?.status === 401) {
    console.log("Sending Refresh token ");
    const res = await fetch(
      "https://book-shop-server-ecru.vercel.app/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );
      result = (await baseQuery(args, api, extraOptions)) as TResponse<any>;
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["book", "order", "users", "cart"],
  endpoints: () => ({}),
});
