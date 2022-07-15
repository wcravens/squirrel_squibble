

`Actions` are plain object with at least a `type` field.  `type` is a string following a `domain/eventName` pattern.
Domain is the feature or category that the action belongs to and the eventName is the specific thing that happened.

Action object often carry a `payload` field as well to carry supporting data.

`Action Creators` are function that create and return an action object.  Basically a factory convienence.

`Reducers` are functions that recieve the current `state` and an `action` object, decides how to update the state if
necssary and returns the new state.  `reducer(state, action) => newState`.  Typically desinged like event listeners.


Reducers must always follow some specific rules:

 - They should only calculate the new state value based on the state and action arguments (pure functions)

 - They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing
   state and making changes to the copied values.

 - They must not do any asynchronous logic, calculate random values, or cause other "side effects"

`Store` is an object holding your state.  Stores are created by passing in a reducer, they then provide a `getState`
method that returns the current state value.  The first reducer is referred to as the root reducer.

`Dispatch` is a method on the `store` that accepts and action object which will invoke the reducers to alter state.
The new state is then retrieved with the `getState` method.

`Selectors` functions that know how to extract specific peices of information from the store state value.

`Slices` are a collection of Redux reducer logic and actions for a single feature in your app, typically defined in 
together in a single file.  Think of spitting up the global state object into subsets of state, or slices of state.

Reducers responsible for updating slices are called `slice reducers`.

Redux Toolkit has a function called `createSlice`, which takes care of the work of generating action type strings, action
creator functions, and action objects.  The `name` field on the slice reducer is used for the `domain` in action objects.
The Keynames associated with each reducers is used as the eventName.

A `thunk` is a special kind of redux function that can contain asynchronous logic.  Thunks are writte using two functions:

 - An inside thunk function, which gets `dispatch` and `getState` as arguments
 - The outside creator function, which creates and returns the thunk function.

Thunk functions are used is the same typcial was as action creators.






