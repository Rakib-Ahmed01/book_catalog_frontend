import { Box, Button, Flex, Grid, Select, Text, Title } from "@mantine/core"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../app/store"
import { useGetAllBooksQuery } from "../../features/book/bookApi"
import useAuth from "../../hooks/useAuth"
import { TBook } from "../../types"
import Spinner from "../shared/Spinner"
import Book from "./Book"

export default function BookList() {
  const searchText = useSelector((state: RootState) => state.filter.searchText)
  const [genre, setGenre] = useState<string | null>(null)
  const [publicationYear, setPublicationYear] = useState<string | null>(null)
  const auth = useAuth()

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
            return <Book book={book} key={book._id} />
          })
        ) : (
          <Text>No book found</Text>
        )}
      </Grid>
    </Box>
  )
}
