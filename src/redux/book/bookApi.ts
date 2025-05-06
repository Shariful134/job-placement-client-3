/* eslint-disable @typescript-eslint/no-explicit-any */
import { TqueryParams, TResponseRedux } from "../../types/type";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createbook: builder.mutation({
      query: (data) => ({
        url: "/admin/create-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    updatebook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/book/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deletebook: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    getAllBooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TqueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin/allbooks",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["book"],

      transformResponse: (response: TResponseRedux<any>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/admin/book/${id}`,
        method: "GET",
      }),
      providesTags: ["book"],
    }),
  }),
});
export const {
  useGetAllBooksQuery,
  useCreatebookMutation,
  useGetSingleBookQuery,
  useUpdatebookMutation,
  useDeletebookMutation,
} = authApi;
