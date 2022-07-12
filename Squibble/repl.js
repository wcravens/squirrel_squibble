import repl from 'node:repl';
const msg = 'message';

import * as Squibble from './index.js'

Squibble.subscribeToInfo( console.log )
Squibble.run();

repl.start( { prompt: 'Squibble > '} );