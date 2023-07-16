import { RegisterPayload } from "../../types"
import { apiSlice } from "../api/apiSlice"
import { userLoggedIn } from "./authSlice"

// Create an API slice and inject endpoints
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // handle user registration
    register: builder.mutation({
      query: (data: RegisterPayload) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    // handle user login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          // wait for the request to complete
          const result = await queryFulfilled

          console.log(result.data.data)

          // setting the response to the local storage
          localStorage.setItem(
            "book-catalog-auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          )

          // storing the response in the redux store
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          )
        } catch (error) {
          // handle error
          console.log(error)
        }
      },
    }),
  }),
})

// Export the hooks
export const { useRegisterMutation, useLoginMutation } = authApi
