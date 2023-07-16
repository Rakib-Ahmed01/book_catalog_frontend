import { ReactNode } from "react"
import { toast } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

type Param = {
  children: ReactNode
}

export default function PrivateRoute(param: Param) {
  const { children } = param
  const isLoggedIn = useAuth()

  if (!isLoggedIn) {
    toast.error("You are not logged in")
  }

  // if the user is logged in return children else navigate to login page
  return isLoggedIn ? children : <Navigate to="/" />
}
