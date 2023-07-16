export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type TBook = {
  title: string
  author: string
  genre: string
  publicationDate: string
  email: string
  _id: string
  // reviews: [];
}

export type User = {
  name: string
  email: string
}

export type ErrorResponse = {
  data: {
    message: string
    errors: { path: string; message: string }[]
  }
}
