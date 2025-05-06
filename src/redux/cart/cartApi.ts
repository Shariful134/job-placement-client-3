import { baseApi } from "../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //createion
    createCart: builder.mutation({
      query: (data) => ({
        url: "/cart/create-cart",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["cart"],
    }),

    //geting
    getAllCart: builder.query({
      query: () => ({
        url: "/cart/create-cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),

    getSingleCart: builder.query({
      query: (id) => ({
        url: `/cart/get-cart/${id}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),

    //updating
    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cart/update-cart/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["cart"],
    }),

    //deleting
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/delete-cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useCreateCartMutation,
  useGetAllCartQuery,
  useUpdateCartMutation,
  useGetSingleCartQuery,
  useDeleteCartMutation,
} = cartApi;
