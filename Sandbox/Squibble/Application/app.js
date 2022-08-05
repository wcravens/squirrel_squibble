import config from "./Config.js";
import { initDepot, get, update, create } from './Depot.js';

const initApp = async (config) => {
  try {
    config.Depot = await initDepot( config.Application.version );
    return config;
  } catch ( error ) {
    console.log( `Error: ${error}` );
    return undefined;
  }
};

const CONFIG = initApp( config );
CONFIG.then( console.log );

//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();
