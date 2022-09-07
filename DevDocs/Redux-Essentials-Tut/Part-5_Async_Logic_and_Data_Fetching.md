# [React Toolkit Essentials Tutorial; Part 5: Async Logic and Data Fetching](https://redux.js.org/tutorials/essentials/part-5-async-logic)

In this section, we'll convert our social media app to fetch the posts and users data from an API, and add new posts by
saving them to the API.

## Example REST API and Client

The project template already contains and in-memory mock REST API configured
with [the Mock Service Worker mock API tool](https://mswjs.io/)

The API uses `/fakeApi` as the base URL for the endpoints, and supports the typical `GET/POST/PUT/DELETE` HTTP methods
for `/fakeApi/posts`, `/fakeApi/users`, and `fakeApi/notifications`. It's defined in src/api/server.js.

***Note:*** *Also, the mock server has been set up to reuse the same random seed each time the page is loaded, so that
it will generate the same list of fake users and fake posts. If you want to reset that, delete the `randomTimestampSeed`
value in your browser's Local Storage and reload the page, or you can turn that off by editing `src/api/server.js` and
setting `useSeededRNG` to false.*

## Thunks and Async Logic

### Using Middleware to Enable Async Logic

Typically, this functionality is added to the store via middleware.  `react-toolkit` takes care of this for us.

They extend the store, and allow you to:

- Execute extra logic when any action is dispatched (such as logging the action and state)
- Pause, modify, delay, replace, or halt dispatched actions
- Write extra code that has access to dispatch and getState
- Teach dispatch how to accept other values besides plain action objects, such as functions and promises, by
  intercepting them and dispatching real action objects instead


<style>img { width: 62% } </style>
![Redux Async Data-Flow Diagram](ReduxAsyncDataFlowDiagram.gif)

### Thunk Functions

Once the thunk middleware has been added to the Redux store, it allows you to pass thunk functions directly to
store.dispatch. A thunk function will always be called with (dispatch, getState) as its arguments, and you can use them
inside the thunk as needed.

For consistency with dispatching normal action objects, we typically write these as thunk action creators, which return
the thunk function. These action creators can take arguments that can be used inside the thunk.

Thunks are typically written in "slice" files. `createSlice` itself does not have any special support for defining thunks,
so you should write them as separate functions in the same slice file. That way, they have access to the plain action
creators for that slice, and it's easy to find where the thunk lives.

### Writing Async [Thunks](https://en.wikipedia.org/wiki/Thunk)

Data fetching logic for Redux typically follows a predictable pattern:

- A "start" action is dispatched before the request, to indicate that the request is in progress. This may be used to
  track loading state to allow skipping duplicate requests or show loading indicators in the UI.
- The async request is made
- Depending on the request result, the async logic dispatches either a "success" action containing the result data, or
  a "failure" action containing error details. The reducer logic clears the loading state in both cases, and either
  processes the result data from the success case, or stores the error value for potential display.

If all you care about is *success* then you can happily forgo *start* and *failure*. They are not required.

The toolkit provides `createAsyncThunk` as a helper to create and dispatch these actions.

`createAsyncThunk` abstracts this pattern by generating the action types and action creators, and generating a thunk that
dispatches those actions automatically. You provide a callback function that makes the async call and returns a Promise
with the result.

## Loading Posts

Remove the `initialState` from our `postsSlice` and replace with an async API call using our mock service.

We'll change the structure in `postsSlice` to keep the loading state along with the array of posts.

Currently, the `useSelector` hooks watching for changes to the posts slice are looking for an array of posts.  We'll also
update these hooks to accommodate our new data structure.  We can move our selector functions into the slice definition
file so that we can update them in one spot when the slice changes and reuse them in any consuming components.


### Loading State for Requests

When we make an API call, we can view its progress as a small state machine that can be in one of four possible states:

- The request hasn't started yet
- The request is in progress
- The request succeeded, and we now have the data we need
- The request failed, and there's probably an error message

It's good to track these states with an enum.
E.g.

```js
{
  // Multiple possible status enum values
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}
```

We'll use this pattern in postsSlice.

### Fetching Data with `createAsyncThunk`

We'll import the `client` utility from  `src/api` and use that to make a request to `/fakeApi/posts`.

`features/posts/postsSlice`

### Reducers and Loading Actions

Let's handle the different actions in our reducers.  At this point we want to handle a reducer that is not defined in
the reducers object.  This is easily achievable with the `extraReducers` field.  We use these to build reducers that
listen for `posts/fetchPosts/succeeded` and `posts/fetchPosts/failed` actions in response to `pending` and `fullfilled`
and `rejected` responses from our promise.

### Displaying Loading State

### Loading Users

You may have noticed that this time the case reducer isn't using the state variable at all. Instead, we're returning the
`action.payload` directly. Immer lets us update state in two ways: either mutating the existing state value, or returning
a new result. If we return a new value, that will replace the existing state completely with whatever we return. (Note
that if you want to manually return a new value, it's up to you to write any immutable update logic that might be
needed.)

## Adding New Posts

We now have to update our `<AddPostForm>` so that it saves new posts in the API and not just in the store.

### Sending Data with Thunks

Update `postsSlice` so that it relies on the server to generate the unique id and expects the server to return the
fully populated post object with all data on success.

Redux Toolkit adds a `.unwrap()` function to the returned Promise, which will return a new Promise that either has the
actual `action.payload` value from a fulfilled action, or throws an error if it's the rejected action. This lets us
handle success and failure in the component using normal try/catch logic. So, we'll clear out the input fields to reset
the form if the post was successfully created, and log the error to the console if it failed.


