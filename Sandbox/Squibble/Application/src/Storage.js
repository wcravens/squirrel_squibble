import PouchDB from 'pouchdb';

export const initStorage = async ( name ) =>
{
  try {
    const db = await new PouchDB( "./data/"+name );
    return await db.info();
  } catch (err) {
    throw `Error: ${err}`;
    return false;
  }
};


