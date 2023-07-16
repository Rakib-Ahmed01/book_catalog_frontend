/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialState = {
  accessToken: null,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
    },
    userLoggedOut: (state) => {
      state.accessToken = null
      state.user = null
    },
  },
})

export const selectUser = (state: RootState) => state.auth.user
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
export const { userLoggedIn, userLoggedOut } = authSlice.actions
