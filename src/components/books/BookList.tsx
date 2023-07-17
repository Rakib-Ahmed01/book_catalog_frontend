/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Box,
  Button,
  Flex,
  Grid,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../app/store"
import { selectUser } from "../../features/auth/authSlice"
import { useGetAllBooksQuery } from "../../features/book/bookApi"
import { changeSearchText } from "../../features/filter/filterSlice"
import { useGetAllReadingsQuery } from "../../features/reading/wishlistApi"
import { useGetAllWishlistsQuery } from "../../features/wishlist/wishlistApi"
import useAuth from "../../hooks/useAuth"
import { TBook } from "../../types"
import Spinner from "../shared/Spinner"
import Book from "./Book"

export default function BookList() {
  const searchText = useSelector((state: RootState) => state.filter.searchText)
  const [genre, setGenre] = useState<string | null>(null)
  const [publicationYear, setPublicationYear] = useState<string | null>(null)
  const auth = useAuth()
  const dispatch = useDispatch()
  const user = useSelector(selectUser) as unknown as { email: string }
  const { data } = useGetAllWishlistsQuery(user?.email)
  const { data: readingsData } = useGetAllReadingsQuery(user?.email)
  const wishlists = data?.data || []
  const readings = readingsData?.data || []

  const {
    data: books,
    isLoading,
    isError,
  } = useGetAllBooksQuery({ searchText, genre, publicationYear })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return "There was an error loading the books"
  }

  return (
    <Box>
      <Flex justify={"space-between"}>
        <Title order={2} ml={0}>
          All Books
        </Title>
        <Flex gap={4}>
          <TextInput
            placeholder="search books by title, author or genre"
            onChange={(e) => dispatch(changeSearchText(e.target.value))}
          />
          <Select
            placeholder="filter by genre"
            data={books?.filterData?.genres || []}
            value={genre}
            onChange={setGenre}
            clearable
          />
          <Select
            placeholder="filter by year"
            data={books?.filterData?.publicationYears || []}
            value={publicationYear}
            onChange={setPublicationYear}
            clearable
          />
          {auth ? (
            <Button component={Link} to={"/add-new-book"}>
              Add Book
            </Button>
          ) : null}
        </Flex>
      </Flex>
      <Grid mt={5}>
        {books.data.length ? (
          (books.data as TBook[]).map((book) => {
            return (
              <Book
                book={book}
                key={book._id}
                bookmarkId={wishlists.find(
                  (w: any) => w.bookId._id == book._id
                )}
                readingId={readings.find((w: any) => w.bookId._id == book._id)}
              />
            )
          })
        ) : (
          <Text>No book found</Text>
        )}
      </Grid>
    </Box>
  )
}
