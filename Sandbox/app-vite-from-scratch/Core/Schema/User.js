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

export default USER_SCHEMA
