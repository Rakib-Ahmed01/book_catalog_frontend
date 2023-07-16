import { Box, Title } from "@mantine/core"
import { AddNewBookForm } from "../components/addNewBook/AddNewBookForm"

export default function AddNewBook() {
  return (
    <Box>
      <Title align="center">Add New Book</Title>
      <AddNewBookForm />
    </Box>
  )
}
