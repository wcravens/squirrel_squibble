import { validate } from './_schema.js';
import { nanoid } from 'nanoid';

const hydrate = obj => validate( obj ) ? obj : undefined;

const entityFields = () => ({
  _id: nanoid(),
  created_on: new Date().toISOString()
});

const newEntity = obj => {
  return ( validate( obj ) )
    ? { ...entityFields(), obj }
    : undefined;
};
