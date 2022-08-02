import * as RTK from '@reduxjs/toolkit';

const { configureStore } = RTK.default ?? RTK

// Error because reduxjs/toolkit is not ES6.
//import { configureStore } from '@reduxjs/toolkit'
// SyntaxError: Named export 'configureStore' not found. The requested module '@reduxjs/toolkit' is a CommonJS module,
// https://github.com/reduxjs/redux-toolkit/issues/1960

import rootReducer from './reducers.js'

//const loadLogger = ( getDefaultMiddleware )
// Use redux-logger just as an example of adding another middleware
import * as loggerRaw from 'redux-logger'
const { createLogger } = loggerRaw.default ?? loggerRaw

const logger = createLogger( {} )

// Use redux-batched-subscribe as an example of adding enhancers
// import { batchedSubscribe } from 'redux-batched-subscribe'
const preloadedState = {}

//const debounceNotify = _.debounce( notify => notify());
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat( logger  ),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
  //enhancers: [ batchedSubscribe(debounceNotify) ],
})