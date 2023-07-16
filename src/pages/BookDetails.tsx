/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Rating,
  ScrollArea,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import jwt_decode from "jwt-decode"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import Spinner from "../components/shared/Spinner"
import { selectAuth } from "../features/auth/authSlice"
import {
  useDeleteBookMutation,
  useGetSingleBooksQuery,
} from "../features/book/bookApi"
import { useAddNewReviewMutation } from "../features/review/reviewApi"
import useAuth from "../hooks/useAuth"
import { ErrorResponse } from "../types"

export default function BookDetails() {
  const { bookId } = useParams()
  const auth: boolean = useAuth()
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState("")
  const [addReview, { isLoading: isAddReviewLoading }] =
    useAddNewReviewMutation()
  const [deleteBook] = useDeleteBookMutation()
  const navigate = useNavigate()
  const accessToken = useSelector(selectAuth).accessToken

  let decodedToken = {} as {
    _id: string
    email: string
  }

  if (auth) {
    decodedToken = jwt_decode(accessToken as any as string) as {
      _id: string
      email: string
    }
  }

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

  const handleCreateReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(reviewText, rating)
    if (!reviewText.length) {
      return toast.error("Please enter review text")
    }

    if (!rating) {
      return toast.error("Please enter rating")
    } else if (
      Number(rating) < 1 ||
      Number(rating) > 5 ||
      isNaN(Number(rating))
    ) {
      return toast.error("Rating must be 1-5")
    }

    try {
      await addReview({
        reviewText,
        bookId: book?.data._id,
        rating: Number(rating),
        reviewer: decodedToken._id,
      }).unwrap()
      toast.success("Review added")
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  const handleDelete = async () => {
    const isSure = window.confirm("Do you really want to delete this book?")
    if (!isSure) {
      return
    }
    try {
      await deleteBook(book.data._id as any as string).unwrap()
      toast.success("Book deleted successfully")
      navigate("/books")
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  return (
    <>
      <Box mt={10} mx={"auto"} maw={600}>
        <Card shadow="xs" padding="lg" radius="md" withBorder>
          <Flex justify={"space-between"} align={"center"}>
            <Group position="apart" mb="xs">
              <Flex gap={4} align={"center"}>
                <Text weight={500}>{book.data.title}</Text>
                <Badge>{book.data.email}</Badge>
              </Flex>
            </Group>
            {auth && decodedToken?.email === book.data.email ? (
              <Flex gap={8}>
                <Link to={`/edit-book/${book.data._id}`}>
                  <IconEdit size={20} fontWeight={400} />
                </Link>
                <IconTrash size={20} fontWeight={400} onClick={handleDelete} />
              </Flex>
            ) : null}
          </Flex>

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

      <ScrollArea mb={16} mt={32} mx={"auto"} maw={600} mih={"60vh"}>
        <Card shadow="xs" padding="lg" radius="md" withBorder>
          <form onSubmit={handleCreateReview}>
            <TextInput
              placeholder="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            <Textarea
              placeholder="your review"
              onChange={(e) => setReviewText(e.target.value)}
              my={10}
            />

            {auth ? (
              <Button type="submit" disabled={isAddReviewLoading}>
                Add Review
              </Button>
            ) : (
              <Button>Login to add review</Button>
            )}
          </form>

          {book.data.reviews.length ? (
            book.data.reviews.map((review: any) => {
              return (
                <Box key={review._id} mt={16}>
                  <Flex align={"center"} gap={5}>
                    <Avatar
                      src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${review.reviewer.email}`}
                      ml={5}
                    ></Avatar>
                    <Box>
                      <Text weight={500}>{review.reviewer.name}</Text>
                      <Rating value={review.rating} readOnly />
                    </Box>
                  </Flex>
                  <Text ml={12} mt={4}>
                    {review.reviewText}
                  </Text>
                </Box>
              )
            })
          ) : (
            <Center>
              <Text>No review is added</Text>
            </Center>
          )}
        </Card>
      </ScrollArea>
    </>
  )
}
