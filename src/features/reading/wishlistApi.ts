/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { apiSlice } from "../api/apiSlice"

const readingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReadings: builder.query({
      query: (email: string) => ({
        url: `/readings?email=${email}`,
      }),
      providesTags: ["Books"],
    }),
    addNewReading: builder.mutation({
      query: (data) => ({
        url: `/readings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteReading: builder.mutation({
      query: (readingId: string) => ({
        url: `/readings/${readingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
})

export const {
  useAddNewReadingMutation,
  useGetAllReadingsQuery,
  useDeleteReadingMutation,
} = readingApi
