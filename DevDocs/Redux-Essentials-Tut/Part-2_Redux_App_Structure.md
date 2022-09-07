# [React Toolkit Essentials Tutorial; Part 2 Redux App Structure](https://redux.js.org/tutorials/essentials/part-2-app-structure)

## Counter App Example

Initialize with template:

    npx create-react-app redux-essentials-example --template redux

***This is a practical exercise.  Follow the tutorial.***

## Application Contents

Here are the key files that make up this application:

- /src
  - index.js: the starting point for the app
  - App.js: the top-level React component
  - /app
    -store.js: creates the Redux store instance
  - /features
    - /counter
      - Counter.js: a React component that shows the UI for the counter feature
      - counterSlice.js: the Redux logic for the counter feature

## Creating the Redux Store

Review `app/store.js`.

The Redux store is created using the Toolkit `configureStore` function by passing in a required reducer.

We can also pass in an object for all reducers with each key will define the keyname in our final state value.

Redux allows store setup to be customized with different kinds of plugins ("middleware" and "enhancers"). configureStore
automatically adds several middleware to the store setup by default to provide a good developer experience, and also
sets up the store so that the Redux DevTools Extension can inspect its contents.

*Note: You can review how `configureStore` calls `combineReducers` with the object it is given via the `reducer` key. 
This is how `configureStore` automatically creates a root reducer.*

### Slices

A "**slice**" is a collection of reducer logic and actions, typically defined in a single file, for a single 'feature'
in our application.  The root reducer is split into a collection of reducers each representing a differnt 'slice' of the
state.  Reducer names are used as root key names in the state object to hold the slice data.


## Creating Slice Reducers and Actions

Review `features/counter/counterSlice.js`.

Redux-Toolkit provides the `createSlice` function which takes care of the generating action type strings, action creator
functions, and action objects.

The action types are created by using the `name` field as the `domain` and the key name of each reducer as
the `eventType`.   When using `createSlice` keep this in mind to create sensible naming.

```js
createSlice( { name: '...', initialState: {...}, reducers: {...} } )`
```

## Rules of Reducers: Review

Basically they are always pure functions.

## Reducers and Immutable Updates

***Note:*** Redux-toolkit automatically wraps our state with immer which
allows patterns such as:

```js
{
  //...,
  increment: state => state.value += 1
}
```

### ***Warning***:

You can only write "mutating" logic in Redux Toolkit's createSlice and createReducer because they use Immer inside! If
you write mutating logic in reducers without Immer, it will mutate the state and cause bugs!

## Writing Async Logic with Thunks

The `store` can be extended with some middleware to enhance the `dispatch()` method so that it can accept values that 
are not pure `actions` but instead things like functions or Promises.

```js
const thunkMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }
```

A **thunk** is a specific kind of Redux function that can contain asynchronous logic.  Thunks are written with two
functions:

- An *inside* thunk function, which gets `dispatch` and `getState` as arguments
- An *outside* creator function, which creates and returns the thunk function.

```js
export const incrementAsync = amount => ( _dispatch, _getState ) => setTimeout(
  () => _dispatch( incrementByAmount( amount ) ),
  1000
)
```

***Note: The above pattern has been superseded with Toolkit's `createAsyncThunk` function.  The example app provides
a mock async API in counterAPI.js.  Just go with it, this topic will be explored later in Part 5.***

```js

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
```

## The React Counter Component

Review `features/counter/Counter.js`.


### Reading data with `useSelector`  and dispatching actions with `useDispatch`

Components cannot import the store directly.  `useDispatch( action )` and `useSelector( _f )` provide the necessary
hooks into `store.dispatch()` and `_f( store.getState() )` to dispatch actions and retrieve state respectively.

Any time an action results in the store being updated, `useSelector` will re-run its selector function and if the value
changes it will result in the component re-rendering.

## Component State and Forms

For state that is unique to a particular component, and there is no need to store incremental changes, you should
simply keep that value using the `useState` hook/method.

**If you're not sure where to put something, here are some common rules of thumb for determining what kind of data
should be put into Redux:**

- Do other parts of the application care about this data?
- Do you need to be able to create further derived data based on this original data?
- Is the same data being used to drive multiple components?
- Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
- Do you want to cache the data (ie, use what's in state if it's already there instead of re-requesting it)?
- Do you want to keep this data consistent while hot-reloading UI components (which may lose their internal state when
  swapped)?


## Providing the Store

Here we see how `useSelector` and `useDispatch` get wired up to our actual `store` instance.

Review `index.js`

```js
//...
import store from './app/store'
import { Provider } from 'react-redux'
//...
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

The Provider component wraps the App component and passes down the store to be used by `useSelector` and `useDispatch`.
Consider this basically dependency injection `react-redux` stylie.
