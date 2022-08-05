import PouchDB from 'pouchdb';
import { validate } from './Core/_schema.js';
import { newEntity } from './Core.js';
let db = undefined;

export const initDepot = async ( name ) => {
  try {
    db = await new PouchDB( "./_data/" + name );
    return await db.info();
  } catch (err) {
    console.log( `Error: ${err}` );
    return undefined;
  }
};

export const get = (id) => db.get( id );

export const create = obj => db.put( newEntity( obj ) );

export const update = ( obj, payload ) => db.put( { ...obj, ...payload } );
