import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { userLoggedIn } from "../features/auth/authSlice"

export default function useAuthCheck() {
  // state for auth check
  const [authChecked, setAuthChecked] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // get user data from the local storage
    const auth = JSON.parse(localStorage.getItem("book-catalog-auth") as string)

    // if user data is not null dispatch userLoggedIn function with user data
    if (auth?.accessToken && auth?.user) {
      dispatch(
        userLoggedIn({
          accessToken: auth.accessToken,
          user: auth.user,
        })
      )
    }
    // set auth check to true
    setAuthChecked(true)
  }, [dispatch])

  // return auth check
  return authChecked
}
