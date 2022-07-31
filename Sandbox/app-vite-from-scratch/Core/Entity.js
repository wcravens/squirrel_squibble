import Ajv from 'ajv/dist/2020.js'
import addFormats from "ajv-formats"

const ENTITY_DECORATOR_SCHEMA = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id":         "/Entity",
  "title":       "Decorator Properties to convert data structures into entities.",
  "description": "At a minimum a unique ID must be association with a data structure to classify as an entity.",
  "type": "object",
  "properties": {
    "_id":        { "type": "string", "minLength": 16, "pattern": "[A-Za-z0-9-_]" },
    "class":      { "type": "string", "const": "Entity/Decorators" },
    "created_on": { "type": "string", "pattern": "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$" },
    "updated_on": { "type": "string", "pattern": "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$" },
  },
  "required": ["_id", "class", "created_on" ]
}

const USER_SCHEMA =
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "/User",
  "type": "object",
  "$ref": "/Entity",
  "properties":{
    "first_name": { "type": "string"  },
    "last_name":  { "type": "string"  },
    "email":      { "type": "string", "format": "email"  },
  },
  "required": [ "first_name", "last_name", "email" ]
}

const ACTION_SCHEMA =
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "/Action",
  "type": "object",
  "$ref": "/Entity",
  "properties":{
    "user":       { "$ref": "/User#$id" },
    "event_type": { "type": "string", "format": "uri-reference" },
    "payload":    { "type": "string", "$comment": "This will be JSON, but it could be anything" }
  },
  "required": [ "user_id", "event_type", "payload" ]
}

const JIRA_TICKET_SCHEMA =
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "/Ticket",
  "type": "object",
  "$ref": "/ENTITY",
  "properties": {
    "ticket_id":   { "type": "string" },
    "summary":     { "type": "string" },
    "description": { "type": "string" },
    "objectives":  { "type": "string", "$comment": "Possible some rich text." },
    "components":  { "type": "array", "items" : { "type": "string" } }
  },
  "required": ['ticket_id', 'summary' ]
}

const PROJECT_SCHEMA =
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "/Project",
  "type": "object",
  "$ref": "/ENTITY",
  "properties": {
    "ticket": { "$ref": "/Ticket" },
    "assigned_to": { "$ref": "/User" }
  }
}

const SchemaList = [ ENTITY_DECORATOR_SCHEMA, JIRA_TICKET_SCHEMA, PROJECT_SCHEMA, USER_SCHEMA, ACTION_SCHEMA ]


const ajv = new Ajv()
addFormats( ajv )
ajv.addSchema( SchemaList )


