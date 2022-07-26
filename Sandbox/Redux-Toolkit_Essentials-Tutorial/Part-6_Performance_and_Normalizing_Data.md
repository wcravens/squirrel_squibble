# [React Toolkit Essentials Tutorial; Part 6 Performance and Normalized Data](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

So far, most of our functionality has been centered around the posts feature. We're going to add a couple new sections
of the app. After those are added, we'll look at some specific details of how we've built things, and talk about some
weaknesses with what we've built so far and how we can improve the implementation.

## Adding User Pages

Let's add a page to show the list of all users, and another to show all posts by a specific user.

## Adding Notifications

The fake API will create some random notification entries every time we make a request.  We will add a button to
manually fetch these from the mock API.

### Notification Slice

Our first step is to setup a new slice, and an async thunk to fetch some notifications.  We will also store a timestamp
for the latest notification in our state.

`features/notifications/notificationsSlice.js`

`app/store.js` Add slice to the store.

### *Thunk Arguments*

The second argument to our payload creator is a thunkAPI object containing several useful functions and pieces of
information. 

- `dispatch` and `getState`: the actual dispatch and getState methods from our Redux store. You can use these inside the
  thunk to dispatch more actions, or get the latest Redux store state (such as reading an updated value after another
  action is dispatched).
- `extra`: the "extra argument" that can be passed into the thunk middleware when creating the store. This is typically
  some kind of API wrapper, such as a set of functions that know how to make API calls to your application's server and
  return data, so that your thunks don't have to have all the URLs and query logic directly inside.
- `requestId`: a unique random ID value for this thunk call. Useful for tracking status of an individual request.
- `signal`: An AbortController.signal function that can be used to cancel an in-progress request.
- `rejectWithValue`: a utility that helps customize the contents of a rejected action if the thunk receives an error.


### Adding Notifications List 

We can now add a `<NotificationsList>` component to our app.

`features/notifications/NotificationsList.js`

`app/Navbar.js` links and button.

`App.js` client side route.

### Showing New Notifications

We'll add a feature that keeps track of which notifications have been read.  And display the number of new unread
notifications as a badge on our Notifications tab in the navbar.

... skipped implementation of these features.  Review Later.


## Improving Render Performance

Review the React Profiler in dev tools.  We can see that UserPage is rendering all the time even if user posts data
hasn't changed.  This is because we are using a `.filter()` function which will always return a different array
reference.  Even though the contents of the array are the same, when the reference changes, the selector function will
inspire a new rendering of the component.

```js
//...
  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter(post => post.user === userId)
  })
//...
```

### Memoization

We can remember the array reference and only return a new one if the `state.posts` have changes or if the `userId`
changes. This is memoization.

[Reselect](https://github.com/reduxjs/reselect) is a library for creating memoized selector functions, and was specifically designed to be used with Redux. It
has a createSelector function that generates memoized selectors that will only recalculate results when the inputs
change. Redux Toolkit exports the createSelector function, so we already have it available.

Use Reselect in `features/posts/postsSlice.js`.

```js
//...
  export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
  )
//...
```

`createSelector` takes one or more "input selector" functions as argument, plus an "output selector" function. When we
call `selectPostsByUser(state, userId)`, `createSelector` will pass all of the arguments into each of our input selectors.
Whatever those input selectors return becomes the arguments for the output selector.


### Investigating the Posts List

If we review the profiler while clicking on the reaction items, we'll see that the whole posts list re-renders every
time.  Reacts default mode is to re-render all children when a parent changes.

When one post is editted it creates a new posts array.  Since the posts array was a new refrence, `<PostList>` re-rendered
all of the `<PostExcerpt>` components as well.

A few options to correct this behavior:

- Use `React.memo()` to wrap a component that will memoize props and only re-render when the props have changed.
- 
