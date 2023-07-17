import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main"
import AddNewBook from "../pages/AddNewBook"
import BookDetails from "../pages/BookDetails"
import Books from "../pages/Books"
import EditBook from "../pages/EditBook"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import WIshLists from "../pages/WIshLists"
import PrivateRoute from "./PrivateRoute"

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
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-book/:bookId",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlists",
        element: (
          <PrivateRoute>
            <WIshLists />
          </PrivateRoute>
        ),
      },
    ],
  },
])
