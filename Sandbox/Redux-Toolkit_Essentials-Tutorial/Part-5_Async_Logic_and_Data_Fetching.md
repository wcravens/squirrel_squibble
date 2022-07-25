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
![Redux Async Data-Flow Diagram](./ReduxAsyncDataFlowDiagram.gif)

### Thunk Functions

Once the thunk middleware has been added to the Redux store, it allows you to pass thunk functions directly to
store.dispatch. A thunk function will always be called with (dispatch, getState) as its arguments, and you can use them
inside the thunk as needed.

For consistency with dispatching normal action objects, we typically write these as thunk action creators, which return
the thunk function. These action creators can take arguments that can be used inside the thunk.

Thunks are typically written in "slice" files. `createSlice` itself does not have any special support for defining thunks,
so you should write them as separate functions in the same slice file. That way, they have access to the plain action
creators for that slice, and it's easy to find where the thunk lives.

