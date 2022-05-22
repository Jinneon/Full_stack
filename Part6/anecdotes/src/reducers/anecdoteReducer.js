import { createSlice } from "@reduxjs/toolkit"
import aneService from "../services/anecdotes"


const aa = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAne(sta, act) {
      return sta.map(a => 
        a.id === act.payload.id 
          ? act.payload
          : a
      )
    },
    appendA(sta, act) {
      sta.push(act.payload)
    },
    addAnedotes(sta, act) {
      return act.payload
    },
  }
})

export const createAnecdotes = () => {
  return async (disp) => {
    const ane = await aneService.getAll()
    disp(addAnedotes(ane))
  }
}

export const vote = (id) => {
  return async (disp) => {
    const ane = await aneService.vote(id)
    disp(voteAne(ane))
  }
}
export const createAnecdote = (content) => {
  return async (disp) => {
    const ane = await aneService.create(content)
    disp(appendA(ane))
  }
}
export default aa.reducer
export const { voteAne, appendA, addAnedotes} = aa.actions