const APPLICATION_SCHEMA =
  {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "/Application",
    "type": "object",
    "$ref": "/ENTITY",
    "properties": {
      "name":     { "type": "string" },
      "version":  { "type": "string" },
      "build_id": { "type": "string" }
    },
    "required": [ "name", "version", "build_it" ]
  }

export default APPLICATION_SCHEMA
