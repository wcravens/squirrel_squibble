import { initConfig } from "./Config.js";
import { initDispatch } from "./Dispatch.js";
import { initStorage } from "./Storage.js";
import ( initCore ) from './Core.js';
/*
Review this: it is a great discussion of Promises and async functions
https://medium.com/@aidobreen/js-promises-async-await-and-functional-programming-f2e5fa66b4ef
*/

const dispatch = initDispatch()


const initApp = async () => {
  try {
    const config        = await initConfig();
    config.STORAGE_INFO = await initStorage( config.APP_VERSION );
    return config;
  } catch ( error ) { throw `${error}`;  }
};

const CONFIG = initApp();
CONFIG.then( console.log );


//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();