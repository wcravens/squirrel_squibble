import { initConfig   } from "./src/Config.js";
import { initDispatch } from "./src/Dispatch.js";
import { initStorage  } from "./src/Storage.js";
import { initCore     } from "./src/Core.js";

const initApp = async () => {
  try {
    const config        = initConfig();
    config.STORAGE_INFO = await initStorage( config.APP_VERSION );
    return config;
  } catch ( error ) {
    console.log( `Error: ${error}` );
    return undefined;
  }
};

const CONFIG = initApp();
CONFIG.then( console.log );


//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();
