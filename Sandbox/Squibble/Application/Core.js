import { validate } from './Core/_schema.js';
import { nanoid } from 'nanoid';

export const hydrate = obj => validate( obj ) ? obj : undefined;

const _entityFields = () => ({
  _id: nanoid(),
  created_on: new Date().toISOString()
});

export const newEntity = obj => {
  const newObj = { obj,  ..._entityFields() };
  return ( validate( newObj ) )
    ? { ..._entityFields(), obj }
    : undefined;
};
