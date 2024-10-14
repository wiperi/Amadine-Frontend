import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inscrement, decrement, addToNum, asyncIncrement, asyncDecrement } from '@/store/modules/counterStore'

export const Counter = () => {
  const { count } = useSelector((state: any) => state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(inscrement())}>+</button>
      <button onClick={() => dispatch(addToNum(10))}>Add 10</button>
      <button onClick={() => dispatch(addToNum(20))}>Add 20</button>
      <button onClick={() => dispatch(asyncIncrement() as any)}>Async Increment</button>
      <button onClick={() => dispatch(asyncDecrement() as any)}>Async Decrement</button>
    </div>
  )
}

