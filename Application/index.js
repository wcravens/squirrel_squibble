import { configureStore } from 'redux-toolkit'
import R from 'ramda'


/*
[Thinking in Ramda](https://randycoulman.com/blog/2016/06/14/thinking-in-ramda-declarative-programming/)

*/
// This is the primary Application Layer

// Primary Responsibilities

const verifyConfigIsObject = ( config ) => typeof( config ) === 'object'

export const appInit = ( config ) => {

}

