import { Config, addConfig } from "./Config.js";
import { initRepo, get, update, create } from './Repository.js';
import { readFileSync } from "fs";
import { execSync } from "child_process";

addConfig( { Package: JSON.parse( readFileSync( './package.json', { encoding: "utf-8" } ) ) } );

addConfig({
  Application: {
    name: Config().Package.name,
    version: Config().Package.version,
    build_id: execSync( 'git describe', { encoding: "utf-8" } ).trim()
  }
});

export const initApp = async ( config ) => {
  try {
    const db_info = await initRepo( config.Application.build_id );
    return addConfig( { Repo: db_info } );
  } catch ( error ) {
    console.log( `Error: ${error}` );
    return undefined;
  }
};

initApp( Config() ).then( console.log );

//(function wait () { { console.log( 'Waiting...' + CONFIG ) ; setTimeout( wait, 1000 ) }} )();
