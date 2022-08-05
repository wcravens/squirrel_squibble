import Ajv from 'ajv/dist/2020.js';
import addFormats from "ajv-formats";
import fs from 'fs';
const ajv = new Ajv();
addFormats( ajv );

ajv.addSchema( fs.readdirSync( './Schema' ).map(
  _ => JSON.parse( fs.readFileSync( 'Schema/'+_, {encoding: "utf-8" } ) )
));

if ( ajv.errors ) throw ajv.errors;

export const validate = _ => ajv.validate( _.resource, _ ) ? true : ajv.errors ;
