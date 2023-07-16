import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../app/store"

// Define an API slice with a reducer path and base URL
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState

      headers.set(
        "Authorization",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Bearer ${state.auth.accessToken}`
      )
      return headers
    },
  }),
  endpoints: (builder) => ({}),
})
