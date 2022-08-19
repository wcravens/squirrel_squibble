#w Squibble Application

The 'application' provides the inner workings of the system.

App: Handles system orchestration and providing the interfaces for inbound and outbound actions.

Core: Validates all Entity CRUD.  This is central business information, 

Config: really a combo of things like traditional configuration (part user and part system) and current application
state for the functional elements outside of core. See it as the Core for system state rather than entity state.

## Exploring Redux Ecosystem

[Redux Ecosystem](https://redux.js.org/introduction/ecosystem)\
[Can/should you use Redux for stateless backend services?](https://medium.com/@marcelthomas/can-you-use-redux-on-a-node-js-server-should-you-8eb3477c67ad)\
[Minimal Redux-Toolkit](https://dev.to/jdvivar/here-s-a-minimalist-no-frills-redux-toolkit-litelement-example-1j91)

## Immutability

immer

## Async

**reduxjs/redux-thunk**\
Dispatch functions, which are called and given dispatch and getState as parameters. This acts as a loophole for AJAX calls and other async behavior.

Best for: getting started, simple async and complex synchronous logic.

**redux-saga/redux-saga**\
Handle async logic using synchronous-looking generator functions. Sagas return descriptions of effects, which are executed by the saga middleware, and act like "background threads" for JS applications.

Best for: complex async logic, decoupled workflows

**redux-observable/redux-observable**\
Handle async logic using RxJS observable chains called "epics". Compose and cancel async actions to create side effects and more.

Best for: complex async logic, decoupled workflows

## Store Watching / Subscribe to Changes

**jprichardson/redux-watch**\
Watch for state changes based on key paths or selectors

**ashaffer/redux-subscribe**\
Centralized subscriptions to state changes based on paths

## Logging

**evgenyrodionov/redux-logger**
Logging middleware that shows actions, states, and diffs

**socialtables/redux-unhandled-action**
Warns about actions that produced no state changes in development

**leoasis/redux-immutable-state-invariant**
Middleware that throws an error when you try to mutate your state either inside a dispatch or between dispatches.

### Inspirational Patterns but not used directly.
redux-clerk
redux-io

## Notes:

[Promises, Async, and Await](https://medium.com/@aidobreen/js-promises-async-await-and-functional-programming-f2e5fa66b4ef)

