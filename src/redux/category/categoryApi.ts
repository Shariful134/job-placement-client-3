/* eslint-disable @typescript-eslint/no-explicit-any */
import { TqueryParams, TResponseRedux } from "../../types/type";
import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createcategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    updatecategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deletecategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
    getAllcategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TqueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/category/get-category",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["category"],

      transformResponse: (response: TResponseRedux<any>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
    }),
    // getSingleBook: builder.query({
    //   query: (id) => ({
    //     url: `/book/get-book/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["book"],
    // }),
  }),
});
export const {
  useCreatecategoryMutation,
  useGetAllcategoryQuery,
  useDeletecategoryMutation,
} = categoryApi;
