/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (orderInfo) => ({
        url: `/order/create-order`,
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["order"],
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/order`,
        params: { order_id },
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: `/order/getOrders`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/update-order/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    getSingleOrder: builder.query({
      query: (order_id) => ({
        url: `/order/getorder/${order_id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});
export const {
  useAddOrderMutation,
  useVerifyOrderQuery,
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
