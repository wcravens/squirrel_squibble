import Ajv from 'ajv/dist/2020.js'
import addFormats from "ajv-formats"
import  $RefParser from "json-schema-ref-parser";



const SchemaList = [ ENTITY_DECORATOR_SCHEMA, JIRA_TICKET_SCHEMA, PROJECT_SCHEMA, USER_SCHEMA, ACTION_SCHEMA, APPLICATION_SCHEMA ]


const ajv = new Ajv()
addFormats( ajv )
ajv.addSchema( SchemaList )


