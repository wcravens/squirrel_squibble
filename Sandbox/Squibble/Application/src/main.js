import { initConfig   } from "./Config.js";
import { initDispatch } from "./Dispatch.js";
import { initStorage  } from "./Storage.js";
import { initCore     } from "./Core.js";

const dispatch = initDispatch()

const initApp = async () => {
  try {
    const config        = await initConfig();
    config.STORAGE_INFO = await initStorage( config.APP_VERSION );
    return config;
  } catch ( error ) {
    console.log( `Error: ${error}` );
    return undefined
  }
};

const CONFIG = initApp();
CONFIG.then( console.log );

//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();