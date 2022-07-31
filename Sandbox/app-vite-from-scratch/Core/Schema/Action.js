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

export default ACTION_SCHEMA
