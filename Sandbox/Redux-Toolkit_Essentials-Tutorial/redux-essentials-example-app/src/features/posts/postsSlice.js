import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns'

const reactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', date: sub( new Date(), { minutes: 10 } ).toISOString(), reactions  },
  { id: '2', title: 'Second Post', content: 'More text', date: sub( new Date(), { minutes: 5 } ).toISOString(), reactions }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState, // Using shorthand: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
  reducers: {
    postAdded: {
      reducer( state, action ) {
        state.push( action.payload ) // Globally state.posts.push(...)
      },
      prepare( title, content, userId ) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions
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
    },
    reactionAdded( state, action ) {
      const { postId, reaction } = action.payload
      const existingPost = state.find( post => post.id === postId )
      if ( existingPost ) {
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts
export const selectPostById = (state, id) => state.posts.find( post => post.id === id )