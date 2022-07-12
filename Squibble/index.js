import PubSub from 'pubsub-js'
import {INFO} from './event-types.js'

export const subscribeToInfo = ( f ) => { PubSub.subscribe( INFO, f ) }
const useHeartBeat = () => {
    setInterval( ()=> { PubSub.publish( INFO, `HeartBeat ${new Date().toISOString()}`) }, 1000 );
}
export const run = () => {
    useHeartBeat();
}