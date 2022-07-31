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

export default ENTITY_DECORATOR_SCHEMA
