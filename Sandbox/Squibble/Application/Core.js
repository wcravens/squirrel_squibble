import { validate } from './Core/_schema.js';
import { nanoid } from 'nanoid';

export const hydrate = obj => validate( obj ) ? obj : undefined;

const _entityFields = ( resource ) => {
  const date = new Date().toISOString();
  return {
    _id: resource + '/' + nanoid(),
    created_on: date,
    updated_on: date
  };
};

export const newEntity = obj => {
  const newObj = { ...obj,  ..._entityFields( obj.resource ) };
  const result = validate( newObj );
  return ( result === true )
    ? newObj
    : console.log( result );
};
