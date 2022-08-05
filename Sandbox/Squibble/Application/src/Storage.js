import PouchDB from 'pouchdb';
import Core from './Core.js'

let db
export const initStorage = async ( name ) =>
{
  try {
    db = await new PouchDB( "./data/"+name );
    return await db.info();
  } catch (err) {
    console.log( `Error: ${err}` );
    return undefined;
  }
};

export const get = (id) => db.get( id );

export const put = ( obj ) => db.put( Core( obj ) );
