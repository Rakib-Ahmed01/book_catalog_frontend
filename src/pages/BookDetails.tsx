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
  ScrollArea,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import Spinner from "../components/shared/Spinner"
import { useGetSingleBooksQuery } from "../features/book/bookApi"
import { useAddNewReviewMutation } from "../features/review/reviewApi"
import useAuth from "../hooks/useAuth"
import { ErrorResponse } from "../types"

export default function BookDetails() {
  const { bookId } = useParams()
  const auth = useAuth()
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState("")
  const [addReview, { isLoading: isAddReviewLoading }] =
    useAddNewReviewMutation()

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

  const handleCreateReview = async () => {
    console.log(reviewText, rating)
    if (!reviewText.length) {
      return toast.error("Please enter review text")
    }

    if (!rating) {
      return toast.error("Please enter rating")
    }

    try {
      await addReview({ reviewText, bookId: book?.data._id }).unwrap()
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
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

      <ScrollArea mt={10} mx={"auto"} maw={600} mih={"60vh"}>
        <Title order={3}>Reviews</Title>
        <Card shadow="xs" padding="lg" radius="md" withBorder>
          {auth ? (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <form onSubmit={handleCreateReview}>
              <TextInput
                placeholder="rating"
                onChange={(e) => setRating(e.target.value)}
              />
              <Textarea
                placeholder="your review"
                onChange={(e) => setReviewText(e.target.value)}
                my={8}
              />

              <Button disabled={isAddReviewLoading}>Add Review</Button>
            </form>
          ) : null}

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
      </ScrollArea>
    </>
  )
}
