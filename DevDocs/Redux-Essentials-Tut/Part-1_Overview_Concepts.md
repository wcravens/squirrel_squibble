# [React Toolkit Essentials Tutorial; Part 1 Overview Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)


## State Management

- **State**: source of truth that drives our app.
- **View**: a declarative description of the UI based on the current state.
- **Actions**: the events that occur in the app based on user input, and trigger updates in the state

Let's avoid lifting state up and instead ensure that state is only needed where it is directly relevant.  We'll do this
extracting shared state out into a central store instead of maintaining it locally.

This is the basic idea behind Redux: a single centralized place to contain the global state in your application, and
specific patterns to follow when updating that state to make the code predictable.

All state updates are done immutably.

## Terminology

**Actions**

- An action is any plain JavaScript object that has at least a `type` field.
- The type field should be a string that gives this action a descriptive name, like "todos/todoAdded". We usually write
  that type string like "domain/eventName", where the first part is the feature or category that this action belongs to,
  and the second part is the specific thing that happened.
- Often an action object will also carry some 'information', usually via a `payload` field.

**Action Creator**
  - Essentially a factory function that returns an action object.  Typically, used so that we don't have to write the
    object constructor code every time we need one.  See example below in **Dispatch**.

**Reducers**
  - A **reducer** is a function that receives the current `state` and an `action` object, updates the state if/as
    necessary and returns the new state: `(state, action) => newState`.  Analogous to an event listener.

  - ***Reducers must always follow some specific rules:***
    - They should only calculate the new state value based on the state and action arguments
    - They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the
      existing state and making changes to the copied values.
    - They must not do any asynchronous logic, calculate random values, or cause other "side effects"
    - *In other words: They must be 'pure functions'.
  - The logic inside reducer functions typically follows the same series of steps:
    1. Check to see if the reducer cares about this action
    2. ? If so, make a copy of the state, update the copy with new values, and return it
    3. : Otherwise, return the existing state unchanged

```js
const initialState = { value: 0 }

const counterReducer = (state = initialState, action) =>
  action.type === 'counter/increment'
    ? { ...state, state.value + 1 }
    : state
}
```

**Store**

  - The current Redux application state lives in an object called the `store`.
  - The `store` is created by giving it a reducer, and has a method called `getState()` that returns the current state.

```js
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore( { reducer: conterReducer } )
//...
console.log( store.getState() )
// {value: 0}
```

- **Dispatch**
 
  - The `store` has a method called `dispatch`.  The only way to update a `store` is to call `dispatch` and pass
    in an `action` object.  The store will run its `reducer` with the `action` and the `state` will be updated (or not).
 
```js
store.dispatch( { type: 'counter/increment' } )
console.log( store.getState() )
// {value: 1}
```

  - We typically call an action creator to dispatch actions:
 
```js
const increment = () =>  { type: 'counter/increment' }

store.dispatch( increment() )
//...
console.log( store.getState() )
// {value: 2}
```

**Selectors**

  - **Selectors** are function that know hot to extract specific pieces of information from a store state value. Helps to
    avoid repeated logic when interrogating the store.
  - Note in the example below that we get the actual value and not the value object this time.
```js
const selectCounterValue = state => state.value
const currentValue = selectCounterValue( store.getState() )

//...
console.log( currentValue )
// 2
```

## Redux Application Data Flow

### One way data-flow overview:

  - State describes the condition of the app at a specific point in time
  - The UI is rendered based on that state
  - When something happens (such as a user clicking a button), the state is updated based on what occurred
  - The UI re-renders based on the new state

### Specifically for Redux we can elaborate:

  - Something happens in the app, such as a user clicking a button
  - The app code dispatches an action to the Redux store, like dispatch({type: 'counter/increment'})
  - The store runs the reducer function again with the previous state and the current action, and saves the return value as the new state
  - The store notifies all parts of the UI that are subscribed that the store has been updated
  - Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
  - Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen.
  -
<style>img { width: 62% } </style>
![Redux Data-Flow Diagram](redux_data_flow_diagram.gif)
