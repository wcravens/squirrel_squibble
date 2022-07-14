import PACKAGE from './package.json';
import md5 from 'md5'
import * as PubSub from 'pubsub-js'
import {INFO} from './event-types.js'


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

PubSub.subscribe( INFO, console.log )

const useHeartBeat = ( delay ) => {
    //PubSub.publish( INFO, `HeartBeat ${new Date().toISOString()}`)
    setInterval( ()=> { PubSub.publish( INFO, `HeartBeat ${new Date().toISOString()}`) }, 1000 * delay );
}

export const register = ( client, options ) => {
  PubSub.publish( INFO, 'Registered Client ' + new Date().toISOString() )
  PubSub.publish( INFO, 'Client: ' + JSON.stringify( client ) )
  PubSub.publish( INFO, 'Client Options: ' + JSON.stringify( options ) )
  if ( options.useHeartbeat > 0 ) {
    useHeartBeat(options.useHeartbeat );
  }
  return CONFIG
}
