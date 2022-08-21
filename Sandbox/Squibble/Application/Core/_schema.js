import Ajv from 'ajv/dist/2020.js';
import addFormats from "ajv-formats";
const ajv = new Ajv();
addFormats( ajv );

import Action from './Schema/Action.json';
import Config from './Schema/Config.json';
import Entity from './Schema/Entity.json';
import Id from './Schema/Id.json';
import Project from './Schema/Project.json';
import User from './Schema/User.json';

const loadSchema = schema => {
  ajv.addSchema( schema );
  if( ajv.errors ) throw ajv.errors;
};
[ Action, Config, Entity, Id, Project, User ].map( loadSchema );

export const validate = _ => ajv.validate( _.resource, _ ) ? true : ajv.errors ;
