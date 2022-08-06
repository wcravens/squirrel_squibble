import Ajv from 'ajv/dist/2020.js';
import addFormats from "ajv-formats";
import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const ajv = new Ajv();
addFormats( ajv );
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const loadSchema = schema => {
  ajv.addSchema( schema )
  if( ajv.errors ) throw ajv.errors
}

fs.readdirSync( __dirname + '/Schema' ).map(
  _ => loadSchema( JSON.parse( fs.readFileSync( __dirname + '/Schema/'+_, {encoding: "utf-8" } ) ) )
);

export const validate = _ => ajv.validate( _.resource, _ ) ? true : ajv.errors ;
