/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Spinner from "../components/shared/Spinner"
import {
  useEditBookMutation,
  useGetSingleBooksQuery,
} from "../features/book/bookApi"
import { ErrorResponse } from "../types"

export default function EditBook() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [updateBook] = useEditBookMutation()
  const {
    data: book,
    isLoading,
    isError,
  } = useGetSingleBooksQuery(bookId as string)

  const form = useForm({
    initialValues: {
      title: book?.data.title || "",
      author: book?.data.author || "",
      genre: book?.data.genre || "",
      publicationYear: book?.data.publicationYear || new Date().getFullYear(),
    },

    validate: {
      publicationYear: (value) =>
        value > new Date().getFullYear()
          ? "Are you a time traveler? Please provide a valid year"
          : null,
    },
  })

  useEffect(() => {
    console.log(book)
    if (!isLoading) {
      form.setValues({
        author: book.data.author,
        genre: book.data.genre,
        publicationYear: book.data.publicationDate,
        title: book.data.title,
      })
    }
  }, [isLoading])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return "There was an error loading the book"
  }

  const handleSubmit = async (values: {
    title: string
    author: string
    genre: string
    publicationYear: number
  }) => {
    const bookData = { ...book.data, ...values }
    bookData.publicationDate = bookData.publicationYear
    delete bookData.publicationYear

    try {
      await updateBook(bookData).unwrap()
      toast.success("Book updated successfully")
      navigate(`/books/${bookId as string}`)
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  return (
    <Box mt={"sm"} w={"95%"} maw={500} mx={"auto"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="title"
          {...form.getInputProps("title")}
          my={4}
        />

        <TextInput
          label="Author"
          placeholder="author"
          {...form.getInputProps("author")}
        />

        <TextInput
          label="Genre"
          placeholder="genre"
          {...form.getInputProps("genre")}
        />

        <TextInput
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
