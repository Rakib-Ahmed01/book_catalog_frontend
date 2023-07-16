import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchText: "",
  genre: "",
  publicationDate: "",
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeSearchText: (state, action) => {
      state.searchText = action.payload
    },
    changeGenre: (state, action) => {
      state.searchText = action.payload
    },
    changePublicationDate: (state, action) => {
      state.searchText = action.payload
    },
  },
})

export default filterSlice.reducer
export const { changeSearchText, changeGenre, changePublicationDate } =
  filterSlice.actions
