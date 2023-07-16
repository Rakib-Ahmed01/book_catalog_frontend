import { apiSlice } from "../api/apiSlice"

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({ url: "/books" }),
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
