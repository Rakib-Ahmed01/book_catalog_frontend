/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { apiSlice } from "../api/apiSlice"

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWishlists: builder.query({
      query: (email: string) => ({
        url: `/wishlists?email=${email}`,
      }),
      providesTags: ["Books"],
    }),
    addNewWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlists`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteWishlist: builder.mutation({
      query: (wishlistId: string) => ({
        url: `/wishlists/${wishlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
})

export const {
  useAddNewWishlistMutation,
  useGetAllWishlistsQuery,
  useDeleteWishlistMutation,
} = wishlistApi
