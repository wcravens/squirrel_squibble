import { validate } from './Schema.js';

import { application } from './Fixtures/Application.js';
import { project } from './Fixtures/Project.js';
import { user } from './Fixtures/User.js';
import { action } from './Fixtures/Action.js';
import { entity } from './Fixtures/Entity.js';

console.log( entity() );
console.log( user() );
console.log( application() );
console.log( project() );
console.log( action() );

console.log( validate( project() ) );
console.log( validate( user() ) );
console.log( validate( application() ) );
console.log( validate( action() ) );
