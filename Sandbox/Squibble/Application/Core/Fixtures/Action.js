import { nanoid } from 'nanoid';
import { entity } from './Entity.js';

export const generate = () => ({
  ...entity(),
  resource: '/Action',
  user: nanoid(),
  event_type: 'somehthing/groovy',
  payload: JSON.stringify( { stuff: true, goes: false, here: 'bar' } )
});

export const action = generate;
