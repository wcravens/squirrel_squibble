import { validate } from './_schema.js';

import { project } from './Fixtures/Project.js';
import { user } from './Fixtures/User.js';

console.log( user() );
console.log( project() );

console.log( validate( project() ) );
console.log( validate( user() ) );
