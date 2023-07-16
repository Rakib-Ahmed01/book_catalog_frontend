import { Badge, Button, Card, Flex, Grid, Group, Text } from "@mantine/core"
import { Link } from "react-router-dom"
import { TBook } from "../../types"

type Param = {
  book: TBook
}

export default function Book(param: Param) {
  const { book } = param

  return (
    <Grid.Col xs={1} sm={2} md={2} lg={3} key={book._id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Flex gap={4} direction={"column"}>
            <Text weight={500}>{book.title}</Text>
            <Badge>{book.email}</Badge>
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
