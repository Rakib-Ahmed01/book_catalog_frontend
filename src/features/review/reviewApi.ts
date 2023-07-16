/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { apiSlice } from "../api/apiSlice"

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewReview: builder.mutation({
      query: (data) => ({
        url: `/reviews/${data.bookId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
})

export const { useAddNewReviewMutation } = reviewApi
