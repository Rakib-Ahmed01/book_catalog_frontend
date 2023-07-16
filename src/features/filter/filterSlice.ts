import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchText: "",
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeSerchText: (state, action) => {
      state.searchText = action.payload
    },
  },
})

export default filterSlice.reducer
export const { changeSerchText } = filterSlice.actions
