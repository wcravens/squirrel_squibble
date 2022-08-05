import { initConfig   } from "./Config.js";
import { initDepot, get, update, create } from './Depot.js';

const initApp = async () => {
  try {
    const config        = initConfig();
    config.STORAGE_INFO = await initDepot( config.APP_VERSION );
    return config;
  } catch ( error ) {
    console.log( `Error: ${error}` );
    return undefined;
  }
};

const CONFIG = initApp();
CONFIG.then( console.log );

//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();
