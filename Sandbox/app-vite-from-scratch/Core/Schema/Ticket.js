const TICKET_SCHEMA =
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
      "components":  { "type": "array", "items" : { "type": "string" } },
      "assigned_to": { "$ref": "/User" }
    },
    "required": ["ticket_id", "summary" ]
  }

export default TICKET_SCHEMA
