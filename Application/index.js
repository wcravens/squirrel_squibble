import PACKAGE from './package.json';
import md5 from 'md5'
import * as PubSub from 'pubsub-js'
import PouchDB from 'pouchdb'
import {INFO, DATASTORE, EVENT, COMMAND, APPSTATE, ERROR} from './event-types.js'
import demoAppFixture from '../Squibble_Browser_Client/src/fixtures/Example_Document_Outline.js'

window.addEventListener("unhandledrejection", event => console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`) )

const publish = ( topic, message ) =>
  PubSub.publish( topic, ( typeof( message ) === 'object' )
    ? { date: new Date().toISOString(), ...message }
    : { date: new Date().toISOString(), message: message } )

const CONFIG = Object.freeze( {
  name:           PACKAGE.Name,
  semver:         PACKAGE.version,
  "pre_release":  PACKAGE.pre_release,
  "build": process.env.REACT_APP_BUILD_ID
} )

const useHeartBeat = ( delay ) => {
    setInterval( ()=> { publish( INFO, 'HeartBeat' ) }, 1000 * delay );
}

const getDocById = ( id, store ) => store.get( id )

const putThenGetById = ( id, doc, store) =>
  store.put( { _id: id, ...doc, date: new Date().toISOString() } )
    .then( res => getDocById( res.id, store  ) )
    .then( doc => doc )
    .catch( err => publish( ERROR, err ) )

const getPutGetById = ( id, doc, store ) =>
  getDocById( id, store )
    .then( doc => doc )
    .catch( res => putThenGetById( id, doc, store ) )
    .then( doc => doc )
    .catch( res => publish( ERROR, res ) )

const flushDataStore = (datastoreId) => new PouchDB( datastoreId ).destroy( datastoreId )

const initDataStore = ( datastoreId ) => {
  const db = new PouchDB( datastoreId )
  publish( DATASTORE, 'Connecting Local: ' + datastoreId )
  publish( DATASTORE, 'DataStore Ready: ' + datastoreId );
  return db
}

export const subscribeToInfo     = ( f ) => { PubSub.subscribe( INFO, f ) }
export const subscribeToAppState = ( f ) => { PubSub.subscribe( APPSTATE, f ) }

export const appInit = async ( client ) => {
  //PubSub.subscribeAll( console.log )
  const startMessage = "Start Squibble Application"
  console.log( startMessage + " " + new Date().toISOString() )
  publish( INFO, startMessage )
  const appId = 'squibble_' + md5( CONFIG.name + CONFIG.build );
  const clientId = 'squibble_' + md5( client.name = client.build )
  const defaultAppState = {
    config: {
      application: { id: appId, ...CONFIG },
      client: { id: clientId, ...client }
    },
    appState: { document: demoAppFixture },
    date: new Date().toISOString()
  }

  try {
    const dataStore = initDataStore( defaultAppState.config.client.id );
    const appState  = await getPutGetById( 'AppState',  defaultAppState,  dataStore )
    publish( APPSTATE, appState )
  } catch ( err ) { publish( ERROR, err ) }
  useHeartBeat( 10 )
}

export default { }
