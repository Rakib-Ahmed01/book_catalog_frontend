/* eslint-disable @typescript-eslint/no-misused-promises */
import { Badge, Button, Card, Flex, Grid, Group, Text } from "@mantine/core"
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectUser } from "../../features/auth/authSlice"
import { useAddNewWishlistMutation } from "../../features/wishlist/wishlistApi"
import useAuth from "../../hooks/useAuth"
import { ErrorResponse, TBook } from "../../types"

type Param = {
  book: TBook
  isBookmarked: boolean
}

export default function Book(param: Param) {
  const { book, isBookmarked } = param
  const [addWishlist] = useAddNewWishlistMutation()
  const auth = useAuth()
  const user = useSelector(selectUser) as unknown as { email: string }

  const handleBookmark = async () => {
    try {
      await addWishlist({ bookId: book._id, email: user.email }).unwrap()
      toast.success("Bookmark created successfully")
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
              isBookmarked ? (
                <IconBookmarkMinus cursor={"pointer"} />
              ) : (
                <IconBookmarkPlus cursor={"pointer"} onClick={handleBookmark} />
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
