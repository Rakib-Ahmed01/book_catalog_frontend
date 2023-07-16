import { Box, Flex, Grid, Select, Title } from "@mantine/core"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useGetAllBooksQuery } from "../../features/book/bookApi"
import { TBook } from "../../types"
import Spinner from "../shared/Spinner"
import Book from "./Book"

export default function BookList() {
  const searchText = useSelector((state: RootState) => state.filter.searchText)

  const {
    data: books,
    isLoading,
    isError,
  } = useGetAllBooksQuery({ searchText })

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
          />
          <Select
            placeholder="filter by year"
            data={books?.filterData?.publicationYears || []}
          />
        </Flex>
      </Flex>
      <Grid mt={5}>
        {(books.data as TBook[]).map((book) => {
          return <Book book={book} key={book._id} />
        })}
      </Grid>
    </Box>
  )
}
