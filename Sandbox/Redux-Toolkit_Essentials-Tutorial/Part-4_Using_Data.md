# [React Toolkit Essentials Tutorial; Part 4 Using Data](https://redux.js.org/tutorials/essentials/part-4-using-data)

Let's add some new features to make our app more useful: viewing a single post, editing existing posts, showing post
author details, post timestamps, and reaction buttons.

## Showing Single Posts

Let's create a single post view that will allow extended functionality beyond what is in the default list view.

Create a new Component `features/posts/SinglePostPage.js`.

When we wire up the new component to the react router, the router will pass in a `match` object as a prop that contains
the URL information.  When we set up the route, we are going to parse the URL and pass a variable named `postId`.  This
value can be read from `match.params`.  *See the code for details.*

## Adding the Single Post Route

Now that we have our \<SinglePostPage\> component, we can wire it up to a route in `App.js`.

```js
//...
import { SinglePostPage} from "./features/posts/SinglePostsPage";
//...
<Route exact path="/posts/:postId" component={SinglePostPage} />
//...
```

Use the `Link` component from `react-router-dom` to provide a link to the `SinglePostPage` view.

Add a feature to the navbar that allows quick return to the default view.

## Editing Posts

We'll add a new feature that will allow us to edit an existing post.

Let's add a new <EditPostForm> component that has the ability to take an existing post ID, read that post from the
store, lets the user edit the title and post content, and then save the changes to update the post in the store.

### Updating Post Entries

Update `postsSlice` to create a new reducer function and an edit action to update the store.

### Create an Edit Post Form

`features/posts/EditPostForm.js`

Import and add a route to `App.js`.

Add edit link to the `SinglePostPage` view.

### Preparing Action Payloads

`createSlice` is generating action creators for us. But we can still provide the logic that we
need to prepare action payloads. We do this by splitting our reducer function into two callback functions
(ReducerAnPrepareObject) using both `reducer` and `producer` functions.
[See docs for createSlice](https://redux-toolkit.js.org/api/createslice#reducers)

`features/posts/postsSlicer.js`

```js
//...
import { nanoid } from "@reduxjs/toolkit";
//...
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
//...
```

## Users and Posts

Add a Users slice and add to the store.

`features/users/usersSlice.js`

`app/store.js`
```js
//..
import usersReducer from '../features/users/usersSlice'
//..
  users: usersReducer
//..
```

## Adding Authors for Posts

`features/posts/postsSlice.js`

```js
//...
prepare( title, content, userId ) {
//...
  user: userId
//...
```

## More Post Features

### Storing Dates for Posts

Add `features/posts/TimeAgo.js` component.  

### Sorting the Posts List

Since `array.sort()` mutates the existing array, we need to make a copy of `state.posts` and sort that copy. We know
that our `post.date` fields are being kept as date timestamp strings, and we can directly compare those to sort the
posts in the right order.

`features/posts/PostsList.js`

```js
//...
const orderedPosts = posts.slice().sort( (a,b) => b.date.localeCompare( a.date ) )
//...
const renderedPosts = orderedPosts.map(post => (
//...
```

### Post Reaction Buttons

We'll implement a feature to allow readers to react to posts. We'll have a set of predefined reactions and maintain a
counter in the store for each one that is incremented each time a reaction is selected.  We'll create a new component
<ReactionButtons> and add it to both <PostsList> and <SinglePost> Views.

## SUMMARY

- **Any React component can use data from the Redux store as needed**
  - Any component can read any data that is in the Redux store
  - Multiple components can read the same data, even at the same time
  - Components should extract the smallest amount of data they need to render themselves
  - Components can combine values from props, state, and the Redux store to determine what UI they need to render. They can read multiple pieces of data from the store, and reshape the data as needed for display.
  Any component can dispatch actions to cause state updates
- ** Redux action creators can prepare action objects with the right contents**
  -createSlice and createAction can accept a "prepare callback" that returns the action payload
  -Unique IDs and other random values should be put in the action, not calculated in the reducer
- **Reducers should contain the actual state update logic**
  -Reducers can contain whatever logic is needed to calculate the next state
  -Action objects should contain just enough info to describe what happened