import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main"
import AddNewBook from "../pages/AddNewBook"
import BookDetails from "../pages/BookDetails"
import Books from "../pages/Books"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "books/:bookId",
        element: <BookDetails />,
      },
      {
        path: "add-new-book",
        element: <AddNewBook />,
      },
    ],
  },
])
