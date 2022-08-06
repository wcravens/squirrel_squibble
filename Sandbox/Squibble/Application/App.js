import { Config, addConfig } from "./Config.js";
import { initRepo, get, update, create } from './Repository.js';
import { newEntity } from './Core.js';
import { readFileSync } from "fs";
import { execSync } from "child_process";

const defaultConfig = () => {
  addConfig( { Package: JSON.parse( readFileSync( './package.json', { encoding: "utf-8" } ) ) } );

  addConfig({
    Application: {
      name:     Config().Package.name,
      version:  Config().Package.version,
      build_id: execSync( 'git describe', { encoding: "utf-8" } ).trim()
    }
  });

  addConfig({
    _id: '/Config/' + Config().Application.build_id,
    resource: '/Config',
  });

};

export const initApp = async ( config ) => {
  try {
    const db_info = await initRepo( config.Application.build_id );
    addConfig( { Repo: db_info } );
    const priorConfig = await get( '/Config/' + config.Application.build_id );
    addConfig( priorConfig );
    addConfig( { updated_on: new Date().toISOString() } );
    const response = await update( Config() );
    return addConfig( { rev: response.rev } );
  } catch ( error ) {
    if( error.message === 'missing' ) {
      addConfig( { created_on: new Date().toISOString() } );
      const response = await create( Config() );
      return addConfig( { rev: response.rev } );
    }
    console.log( `Error: ${error}` );
    return undefined;
  }
};

defaultConfig();
initApp( Config() )
  .then( _ => {
    console.log( "App initialized." );
    return _;
  } )
  .then( console.log )
  .catch( console.log );

//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();
