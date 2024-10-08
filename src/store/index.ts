import { configureStore } from "@reduxjs/toolkit"
import counterReducer from './modules/counterStore'
import userReducer from './modules/userStore'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  }
})

export default store