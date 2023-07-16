/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Rating,
  Text,
  Textarea,
  Title,
} from "@mantine/core"
import { useParams } from "react-router-dom"
import Spinner from "../components/shared/Spinner"
import { useGetSingleBooksQuery } from "../features/book/bookApi"

export default function BookDetails() {
  const { bookId } = useParams()

  const {
    data: book,
    isLoading,
    isError,
  } = useGetSingleBooksQuery(bookId as string)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return "There was an error loading the book"
  }

  return (
    <>
      <Box mt={10} mx={"auto"} maw={600}>
        <Title order={3}>{book.data.title}</Title>
        <Card shadow="xs" padding="lg" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{book.data.title}</Text>
          </Group>

          <Text size="sm" color="dimmed">
            Author: {book.data.author}
          </Text>

          <Text size="sm" color="dimmed">
            Genre: {book.data.genre}
          </Text>

          <Text size="sm" color="dimmed">
            Publication Date: {book.data.publicationDate}
          </Text>
        </Card>
      </Box>

      <Box mt={10} mx={"auto"} maw={600}>
        <Title order={3}>Reviews</Title>
        <Card shadow="xs" padding="lg" radius="md" withBorder>
          <form>
            <Textarea placeholder="your review" />
            <Button mt={8}>Add Review</Button>
          </form>

          {book.data.reviews.map((review: any) => {
            return (
              <Box key={review._id} mt={16}>
                <Flex align={"center"} gap={5}>
                  <Avatar
                    src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${review.reviewer.email}`}
                    ml={5}
                  />
                  <Box>
                    <Text>{review.reviewer.name}</Text>
                    <Rating value={review.rating} readOnly />
                  </Box>
                </Flex>
                <Text ml={12} mt={4}>
                  {review.reviewText}
                </Text>
              </Box>
            )
          })}
        </Card>
      </Box>
    </>
  )
}
