import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState, // Using shorthand: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
  reducers: {}
})

export default postsSlice.reducer
