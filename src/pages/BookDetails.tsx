import { Box, Card, Group, Text, Title } from "@mantine/core"
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
    <Box mt={10} mx={"auto"} maw={600}>
      <Title order={3}>{book.data.title}</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
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
  )
}
