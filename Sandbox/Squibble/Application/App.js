import { Config, addConfig, defaultConfig } from "./Config.js";
import { initRepo, getById, update, create } from './Repository.js';

export const _initApp = async () => {
  const config = Config();
  try {
    const db_info = await initRepo( config.Application.build_id );
    addConfig( { Repo: db_info } );
    const priorConfig = await getById( '/Config/' + config.Application.build_id );
    addConfig( { ...priorConfig, updated_on: new Date().toISOString() } );
    const response = await update( Config() );
    addConfig( { rev: response.rev } );
    return Config();
  } catch ( error ) {
    if( error.message === 'missing' ) {
      addConfig( { created_on: new Date().toISOString() } );
      const response = await create( Config() );
      addConfig( { rev: response.rev } );
      return Config();
    }
    console.log( `Error: ${error}` );
    return undefined;
  }
};

export const initApp = () =>
  _initApp()
    .then( _ => {
      console.log( "App initialized." );
      return _;
    } )
    .catch( _ => console.log( "Error: " + _ ) );

//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();


