import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    inscrement (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    addToNum (state, action) {
      state.count = action.payload
    }
  }
})

const { inscrement, decrement, addToNum } = counterStore.actions

const reducer = counterStore.reducer

export { inscrement, decrement, addToNum }
export default reducer