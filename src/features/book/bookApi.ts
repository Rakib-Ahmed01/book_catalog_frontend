/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { apiSlice } from "../api/apiSlice"

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ searchText, genre, publicationYear }) => ({
        url: `/books?searchTerm=${searchText}&genre=${
          genre || ""
        }&publicationDate=${publicationYear || ""}`,
      }),
      providesTags: ["Books"],
    }),
    getSingleBooks: builder.query({
      query: (bookId: string) => ({ url: `/books/${bookId}` }),
      providesTags: ["Books"],
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
})

export const {
  useGetAllBooksQuery,
  useAddNewBookMutation,
  useGetSingleBooksQuery,
} = bookApi
