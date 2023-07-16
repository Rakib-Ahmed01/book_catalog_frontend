import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

type Param = {
  children: ReactNode
}

export default function PrivateRoute(param: Param) {
  const { children } = param
  const isLoggedIn = useAuth()

  // if the user is logged in return children else navigate to login page
  return isLoggedIn ? children : <Navigate to="/" />
}
