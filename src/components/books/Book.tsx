/* eslint-disable @typescript-eslint/no-misused-promises */
import { Badge, Button, Card, Flex, Grid, Group, Text } from "@mantine/core"
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectUser } from "../../features/auth/authSlice"

import {
  useAddNewWishlistMutation,
  useDeleteWishlistMutation,
} from "../../features/wishlist/wishlistApi"
import useAuth from "../../hooks/useAuth"
import { ErrorResponse, TBook } from "../../types"

type Param = {
  book: TBook
  bookmarkId: string
}

export default function Book(param: Param) {
  const { book, bookmarkId } = param
  const [addWishlist] = useAddNewWishlistMutation()
  const [deleteWishlist] = useDeleteWishlistMutation()
  const auth = useAuth()
  const user = useSelector(selectUser) as unknown as { email: string }

  console.log(bookmarkId)

  const handleAddBookmark = async () => {
    try {
      await addWishlist({ bookId: book._id, email: user.email }).unwrap()
      toast.success("Bookmark created successfully")
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  const handleDeleteBookmark = async () => {
    try {
      await deleteWishlist(bookmarkId).unwrap()
      toast.success("Bookmark deleted successfully")
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  return (
    <Grid.Col xs={1} sm={2} md={2} lg={3} key={book._id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Flex justify={"space-between"} align={"start"} w={"100%"}>
            <Flex gap={4} direction={"column"}>
              <Text weight={500}>{book.title}</Text>
              <Badge>{book.email}</Badge>
            </Flex>
            {auth ? (
              bookmarkId ? (
                <IconBookmarkMinus
                  cursor={"pointer"}
                  onClick={handleDeleteBookmark}
                />
              ) : (
                <IconBookmarkPlus
                  cursor={"pointer"}
                  onClick={handleAddBookmark}
                />
              )
            ) : null}
          </Flex>
        </Group>

        <Text size="sm" color="dimmed">
          Author: {book.author}
        </Text>

        <Text size="sm" color="dimmed">
          Genre: {book.genre}
        </Text>

        <Text size="sm" color="dimmed">
          Publication Date: {new Date(book.publicationDate).getFullYear()}
        </Text>

        <Button
          variant="light"
          color="blue"
          sx={{ textDecoration: "none" }}
          fullWidth
          mt="md"
          radius="md"
          component={Link}
          to={`/books/${book._id}`}
        >
          Learn more
        </Button>
      </Card>
    </Grid.Col>
  )
}
