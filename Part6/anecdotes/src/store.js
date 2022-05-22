
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import { configureStore } from "@reduxjs/toolkit"

import filterReducer from "./reducers/filterReducer"

const s = configureStore ({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    message: notificationReducer,
  }
})

export default s