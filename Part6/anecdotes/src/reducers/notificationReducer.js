import { createSlice } from "@reduxjs/toolkit"

const notiSlice = createSlice({
  name: "message",
  initialState: "",
  reducers: {
    addNoti(sta, act) {
      sta = act.payload
      return sta
    },
    deleteNoti(sta, act) {
      sta = ""
      return sta
    }
  },
})

export const setNoti = (message, time) => {
  return (disp) => {
    disp(addNoti(message))
    setTimeout(() => 
      disp(deleteNoti()),
      time * 1000
    ) 
  }
}

export default notiSlice.reducer
export const { addNoti,deleteNoti } = notiSlice.actions 