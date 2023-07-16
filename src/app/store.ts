import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../features/api/apiSlice"
import authReducer from "../features/auth/authSlice"
import filterReducer from "../features/filter/filterSlice"

// configure the store
export const store = configureStore({
  // all reducers
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    filter: filterReducer,
  },
  // concat apislice middleware with the default middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // disable devtools in production
  devTools: import.meta.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
