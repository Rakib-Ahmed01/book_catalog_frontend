import { useSelector } from "react-redux"
import { selectAuth } from "../features/auth/authSlice"

export default function useAuth() {
  // select auth from the store
  const auth = useSelector(selectAuth)

  // return true if the user is logged in
  return auth?.accessToken && auth?.user ? true : false
}
