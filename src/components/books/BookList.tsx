import { Box, Grid, Title } from "@mantine/core"
import { useGetAllBooksQuery } from "../../features/book/bookApi"
import { TBook } from "../../types"
import Spinner from "../shared/Spinner"
import Book from "./Book"

export default function BookList() {
  const { data: books, isLoading, isError } = useGetAllBooksQuery(undefined)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return "There was an error loading the books"
  }

  return (
    <Box>
      <Title order={2} ml={0}>
        All Books
      </Title>
      <Grid mt={5}>
        {(books.data as TBook[]).map((book) => {
          return <Book book={book} key={book._id} />
        })}
      </Grid>
    </Box>
  )
}
