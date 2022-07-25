import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState, // Using shorthand: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
  reducers: {
    postAdded: {
      reducer( state, action ) {
        state.push( action.payload ) // Globally state.posts.push(...)
      },
      prepare( title, content ) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    },
    postUpdated( state, action ) {
      const { id, title, content } = action.payload
      const existingPost = state.find( post => post.id === id )
      if( existingPost ) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
