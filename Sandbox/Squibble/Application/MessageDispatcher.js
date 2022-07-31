import PubSub from 'pubsub-js'

const initMessenger = () => {
  const mySubscriber = ( msg, data ) => { console.log( msg, data ) };
  PubSub.subscribe( 'MY_TOPIC', mySubscriber );
  PubSub.publish( 'MY_TOPIC', 'Hello!!!' )
}

console.log( Object.keys( PubSub ) )
