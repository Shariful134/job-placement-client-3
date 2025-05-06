/* eslint-disable @typescript-eslint/no-explicit-any */
import { TqueryParams, TResponseRedux } from "../../types/type";
import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TqueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin/get-users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],

      transformResponse: (response: TResponseRedux<any>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
    }),
  }),
});
export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
} = userApi;
