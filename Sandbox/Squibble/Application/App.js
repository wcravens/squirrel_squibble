import { initConfig } from "./Config.js";
import { initStorage } from "./Storage.js";
import { initMessener } from "./MessageDispatcher.js"

const initApp = async () => {

  try {
    const config        = await initConfig();
    config.STORAGE_INFO = await initStorage( config.APP_VERSION );
    return config;
  } catch ( error ) { throw error }
};

const CONFIG = initApp();
CONFIG.then( console.log );


//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();

//console.log( CONFIG )

//const storeInfo = initializeStorage( CONFIG.APP_VERSION ).catch( console.log );

/*
const data = newProjectData()
const docData = await db.put( data )
data.rev = docData.rev
console.log( JSON.stringify( data ) )
const requestId = (({ _id }) => ({_id}))( data )
return await db.get( requestId._id )
*/
