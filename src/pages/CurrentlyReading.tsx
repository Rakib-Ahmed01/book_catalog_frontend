/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box, Flex, Grid, Text, Title } from "@mantine/core"
import { useSelector } from "react-redux"
import Book from "../components/books/Book"
import Spinner from "../components/shared/Spinner"
import { selectUser } from "../features/auth/authSlice"
import { useGetAllReadingsQuery } from "../features/reading/wishlistApi"

export default function CurrentlyReading() {
  const user = useSelector(selectUser) as unknown as { email: string }
  const { data, isLoading, isError } = useGetAllReadingsQuery(user?.email)
  const readings = data?.data || []

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
          Currently Reading
        </Title>
      </Flex>
      <Grid mt={5}>
        {readings.length ? (
          readings.map((wishlist: any) => {
            return (
              <Book
                book={wishlist.bookId}
                key={wishlist.bookId._id}
                readingId={readings.find(
                  (w: any) => w.bookId._id == wishlist.bookId._id
                )}
              />
            )
          })
        ) : (
          <Text>You are not reading any book</Text>
        )}
      </Grid>
    </Box>
  )
}
