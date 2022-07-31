const PROJECT_SCHEMA =
  {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "/Project",
    "type": "object",
    "$ref": "/ENTITY",
    "properties": {
      "ticket":      { "$ref": "/Ticket" },
      "assigned_to": { "$ref": "/User" }
    }
  }

export default PROJECT_SCHEMA
