import { createSlice } from "@reduxjs/toolkit"

const fSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filter(sta, act) {
      sta = act.payload
      return sta
    }
  },
})

export default fSlice.reducer
export const { filter } = fSlice.actions