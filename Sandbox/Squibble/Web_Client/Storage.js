import PouchDB from 'pouchdb'
import { loadConfig } from "./loadConfig.js";
import { newProjectData} from "./FakeData.js";

const setupDB = async () => {
  const CONFIG = await loadConfig()
  const db = await new PouchDB( "./data/" + CONFIG.APP_VERSION )
  await db.info( console.log )
  const data = newProjectData()
  //console.log( data )
  const docData = await db.put( data )
  data.rev = docData.rev
  console.log( JSON.stringify( data ) )
  const requestId = (({ _id }) => ({_id}))( data )
  return await db.get( requestId._id )
}

setupDB()

const wait = () => ( setTimeout( wait, 1000 ) )
wait()
