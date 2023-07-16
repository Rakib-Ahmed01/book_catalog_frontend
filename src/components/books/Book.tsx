import { Button, Card, Grid, Group, Text } from "@mantine/core"
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
          <Text weight={500}>{book.title}</Text>
        </Group>

        <Text size="sm" color="dimmed">
          Author: {book.author}
        </Text>

        <Text size="sm" color="dimmed">
          Genre: {book.genre}
        </Text>

        <Text size="sm" color="dimmed">
          Publication Date: {book.publicationDate}
        </Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Learn more
        </Button>
      </Card>
    </Grid.Col>
  )
}
