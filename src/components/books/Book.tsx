/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Badge, Button, Card, Flex, Grid, Group, Text } from "@mantine/core"
import {
  IconBook,
  IconBook2,
  IconBookmarkMinus,
  IconBookmarkPlus,
} from "@tabler/icons-react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectUser } from "../../features/auth/authSlice"

import {
  useAddNewReadingMutation,
  useDeleteReadingMutation,
} from "../../features/reading/wishlistApi"
import {
  useAddNewWishlistMutation,
  useDeleteWishlistMutation,
} from "../../features/wishlist/wishlistApi"
import useAuth from "../../hooks/useAuth"
import { ErrorResponse, TBook } from "../../types"

type Param = {
  book: TBook
  bookmarkId: { _id: string }
  readingId: { _id: string }
}

export default function Book(param: Param) {
  const { book, bookmarkId, readingId } = param
  const [addWishlist, { isLoading: isaddWishlistLoading }] =
    useAddNewWishlistMutation()
  const [deleteWishlist, { isLoading: isdeleteWishlistLoading }] =
    useDeleteWishlistMutation()
  const [addReading, { isLoading: isaddReadingLoading }] =
    useAddNewReadingMutation()
  const [deleteReading, { isLoading: isdeleteReadingLoading }] =
    useDeleteReadingMutation()
  const auth = useAuth()
  const user = useSelector(selectUser) as unknown as { email: string }

  const handleAddBookmark = async () => {
    if (!isaddWishlistLoading) {
      try {
        await addWishlist({ bookId: book._id, email: user.email }).unwrap()
        toast.success("Bookmark added successfully")
      } catch (error) {
        toast.error((error as ErrorResponse).data.message)
      }
    }
  }

  const handleDeleteBookmark = async () => {
    if (!isdeleteWishlistLoading) {
      try {
        await deleteWishlist(bookmarkId._id).unwrap()
        toast.success("Bookmark deleted successfully")
      } catch (error) {
        toast.error((error as ErrorResponse).data.message)
      }
    }
  }

  const handleAddReading = async () => {
    if (!isaddReadingLoading) {
      try {
        await addReading({ bookId: book._id, email: user.email }).unwrap()
        toast.success("Reading added successfully")
      } catch (error) {
        toast.error((error as ErrorResponse).data.message)
      }
    }
  }

  const handleDeleteReading = async () => {
    if (!isdeleteReadingLoading) {
      try {
        await deleteReading(readingId._id).unwrap()
        toast.success("Reading deleted successfully")
      } catch (error) {
        toast.error((error as ErrorResponse).data.message)
      }
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
            <Flex gap={8}>
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
              {auth ? (
                !readingId ? (
                  <IconBook2 cursor={"pointer"} onClick={handleAddReading} />
                ) : (
                  <IconBook cursor={"pointer"} onClick={handleDeleteReading} />
                )
              ) : null}
            </Flex>
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
