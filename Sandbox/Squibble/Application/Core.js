import { validate } from './Core/_schema.js';
import { nanoid } from 'nanoid';

export const hydrate = obj => validate( obj ) ? obj : undefined;

const _entityFields = ( resource ) => ({
  _id: resource + '/' + nanoid(),
  resource,
  created_on: new Date().toISOString()
});

export const newEntity = obj => {
  const newObj = { ...obj,  ..._entityFields( obj.resource ) };
  console.log( newObj );
  return ( validate( newObj ) )
    ? newObj
    : undefined;
};
