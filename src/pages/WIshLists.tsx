/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box, Flex, Grid, Text, Title } from "@mantine/core"
import { useSelector } from "react-redux"
import Book from "../components/books/Book"
import Spinner from "../components/shared/Spinner"
import { selectUser } from "../features/auth/authSlice"
import { useGetAllWishlistsQuery } from "../features/wishlist/wishlistApi"

export default function WIshLists() {
  const user = useSelector(selectUser) as unknown as { email: string }
  const { data, isLoading, isError } = useGetAllWishlistsQuery(user?.email)
  const wishlists = data?.data || []

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
          Wishlists
        </Title>
      </Flex>
      <Grid mt={5}>
        {wishlists.length ? (
          wishlists.map((wishlist: any) => {
            return (
              <Book
                book={wishlist.bookId}
                key={wishlist.bookId._id}
                bookmarkId={wishlists.find(
                  (w: any) => w.bookId._id == wishlist.bookId._id
                )}
              />
            )
          })
        ) : (
          <Text>No wishlist found</Text>
        )}
      </Grid>
    </Box>
  )
}
