import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inscrement, decrement, addToNum } from '../store/modules/counterStore'

export const Counter = () => {
  const { count } = useSelector((state: any) => state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(inscrement())}>+</button>
      <button onClick={() => dispatch(addToNum(10))}>add To 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add To 20</button>
    </div>
  )
}

