/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { apiSlice } from "../api/apiSlice"

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ searchText }) => ({ url: `/books?searchTerm=${searchText}` }),
    }),
    getSingleBooks: builder.query({
      query: (bookId: string) => ({ url: `/books/${bookId}` }),
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetAllBooksQuery,
  useAddNewBookMutation,
  useGetSingleBooksQuery,
} = bookApi
