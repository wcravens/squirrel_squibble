import PACKAGE from './package.json';
import md5 from 'md5'
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
const useHeartBeat = () => {
    setInterval( ()=> { PubSub.publish( INFO, `HeartBeat ${new Date().toISOString()}`) }, 1000 );
}
export const run = () => {
    useHeartBeat();
}

export const register = ( client ) => {
  return CONFIG
}
