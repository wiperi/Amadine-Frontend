import { createSlice, createAsyncThunk, ThunkAction, AnyAction, Dispatch } from "@reduxjs/toolkit"

const counterStore = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    // action creators
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

// async action
const asyncDecrement = createAsyncThunk('counter/asyncDecrement', async (_, { dispatch }) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  dispatch(decrement())
})
const asyncIncrement = () => (dispatch: any) => {
  new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
    dispatch(inscrement())
  })
}

const { inscrement, decrement, addToNum } = counterStore.actions

export { inscrement, decrement, addToNum, asyncIncrement, asyncDecrement }
export default counterStore.reducer