import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState, // Using shorthand: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
  reducers: {
    postAdded( state, action) {
      state.push( action.payload ) // Globally state.posts.push(...)
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
