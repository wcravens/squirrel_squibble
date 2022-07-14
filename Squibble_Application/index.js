import PACKAGE from './package.json';
import md5 from 'md5'
import * as PubSub from 'pubsub-js'
import PouchDB from 'pouchdb'
import {INFO, DATASTORE, EVENT, COMMAND} from './event-types.js'
let DataStore;

const publish = (topic, msg) => {
  PubSub.publish( topic, new Date().toISOString() + " " + msg )
}
const config = {
    name:           PACKAGE.Name,
    semver:         PACKAGE.version,
    "pre_release":  PACKAGE.pre_release,
    "build": process.env.REACT_APP_BUILD_ID
}

const CONFIG = Object.freeze( {
        "id": 'squibble_' + md5( config.name + config.build ),
        ...config
    })

export const subscribeToInfo = ( f ) => { PubSub.subscribe( INFO, f ) }
export const subscsribeToStore = ( f ) => { PubSub.subscribe( STORE, f ) }

PubSub.subscribeAll( console.log )

const useHeartBeat = ( delay ) => {
    setInterval( ()=> { publish( INFO, 'HeartBeat' ) }, 1000 * delay );
}

export const init = async () => {
  publish( DATASTORE, 'Connecting Local: ' + CONFIG.id )
  DataStore = new PouchDB( CONFIG.id )
  publish( DATASTORE, 'DataStore Ready: ' + CONFIG.id );
  publish( INFO, 'DataStore initialized.' );
}

let AppConfig;

export const register = ( client, options ) => {
  publish( INFO, `Starting ${CONFIG.name}.`)
  if ( options.useHeartbeat > 0 ) {
    useHeartBeat(options.useHeartbeat );
  }
  publish( INFO, `Registered Client: ${client.name}` )
  publish( INFO, 'Client: '            + JSON.stringify( client ) )
  publish( INFO, 'Client Options: '    + JSON.stringify( options ) )
  init()
  DataStore.get( 'AppConfig' ).then( (doc) => {
    AppConfig = doc
    publish( INFO, 'Fetched AppConfig.' + JSON.stringify( AppConfig ) )
  }).catch( err => {
    if ( err.name !== 'not_found' ) {
      return publish( INFO, 'Error getting AppConfig: ' + err )
    }
    DataStore.put( { _id: 'AppConfig', application: CONFIG, client: client } ).then( (doc) => {
      publish( DATASTORE, 'Successfully stored: ' + JSON.stringify( doc ) )
    } ).catch( err => publish( DATASTORE, "Error storing initial AppConfig. " + err ) )
  } )
  return CONFIG
}
