/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUser } from "../../features/auth/authSlice"
import { useAddNewBookMutation } from "../../features/book/bookApi"
import { ErrorResponse, User } from "../../types"

export function AddNewBookForm() {
  const user = useSelector(selectUser) as unknown as User
  const [addBook, { isLoading }] = useAddNewBookMutation()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      publicationYear: new Date().getFullYear(),
    },

    validate: {
      publicationYear: (value) =>
        value > new Date().getFullYear()
          ? "Are you a time traveler? Please provide a valid year"
          : null,
    },
  })

  const handleSubmit = async (values: {
    title: string
    author: string
    genre: string
    publicationYear: number
  }) => {
    const { author, genre, publicationYear, title } = values
    const bookData = {
      author,
      genre,
      publicationDate: publicationYear.toString(),
      title,
      email: user.email,
      reviews: [],
    }
    try {
      await addBook(bookData).unwrap()
      toast.success("Book created successfully")
      navigate("/books")
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  return (
    <Box mt={"sm"} w={"95%"} maw={500} mx={"auto"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="title"
          {...form.getInputProps("title")}
          my={4}
        />

        <TextInput
          withAsterisk
          label="Author"
          placeholder="author"
          {...form.getInputProps("author")}
        />

        <TextInput
          withAsterisk
          label="Genre"
          placeholder="genre"
          {...form.getInputProps("genre")}
        />

        <TextInput
          withAsterisk
          label="Publication Year"
          placeholder="publication year"
          {...form.getInputProps("publicationYear")}
        />

        <Group mt="md">
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}
