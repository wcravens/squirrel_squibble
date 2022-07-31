import PouchDB from 'pouchdb'

export const initStorage = async ( name ) => {
  try {
    const db = await new PouchDB( "./data/"+name );
    const storageInfo = await db.info();
    return storageInfo;
  } catch (err) { console.log( err ) }
};
