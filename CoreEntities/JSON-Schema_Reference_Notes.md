# JSON-Schema Reference Notes

JSON-Schema is a specification that lets you define JSON structure and then implementations that can validate objects 
against the schema.

[JSON-Schema](https://json-schema.org/), [Understanding JSON-Schema](https://json-schema.org/understanding-json-schema/)

## What is a Schema 

JSON is built on top of the following data types: object, array, number, string, boolean and null

JSON is the "Javascript Object Notation" which provides a string serialization technique that is primarily used to send
data and/or messages between applications or sub-systems within applications.

JSON Schemas provide a standardized methodology to use JSON documents to define the requirements for application
objects or messages.

Validator implementations can they use the JSON Schema definitions to validate actual objects in memory or object
structures immediately before(after) JSON serializations(de-serialization).

There are many validators for JSON-Schema across many languages and platforms. We will focus
on [ajv](https://github.com/ajv-validator/ajv) which is a JavaScript validator that is very fast and mature.

An empty object `{}` (or `true`) is the least valid JSON Schema. So it all starts with maximum flexibility. An empty object
Schema(or `true`) will validate against all valid JS Objects or JSON.  `false` will validate against nothing.
`{}` same as `true`.

Declare the JSON-Schema version you are using.\
`{ "$schema": "https://json-schema.org/draft/2020-12/schema" }`

Provide a unique ID for each of your schemas with the `$id` property.\
`{   ..., "$id": "something/unique" }`

See: `Sandbox/ajv_starter.js` for a quick usage example.

## Type Specific Keywords

The `type` keyword is essential and specifies the data type for a schema. 

The type keyword may either be a string or an array:

- If it’s a string, it is the name of one of the basic types above.
- If it is an array, it must be an array of strings, where each string is the name of one of the basic types, and each
  element is unique. In this case, the JSON snippet is valid if it ***matches any of the given types***.

Valid types are: `string`, `number`, `integer`, `object`, `array`, `boolean`, or `null`.

For each of these types there are keywords that apply to those types.  Summarized below...

### `string`

```
minLength: INTEGER
maxLength: INTEGER
pattern:   REGEX
format:    formatSpec
```

***Note:*** *The `ajv` validation engine will use formats
from [ajv-fomats](https://github.com/ajv-validator/ajv-formats) and ignore 'Built-in Formats' from JSON-Schema.*

### `number` and `integer`

```js
"type": "integer" //Positive and negative whole numbers.  Including those with zero fractional part, e.g. `1.0`.\
"type": "number"  //Any valid number.
```

```js
{
  "type": "integer" | "number",
  "multipleOf":       POSITIVE_WHOLE_NUMBER,
  "minimum":          NUMBER, // _ >= NUMBER
  "exclusiveMinimum": NUMBER, // _ >  NUMBER
  "maximum":          NUMBER, // _ <= NUMBER
  "exclusiveMaximum": NUMBER  // _ <  NUMBER
}
```

### `object`

```js
{
  "type": "object",
  "properties": {
    PROPERTY_NAME: SCHEMA,
    ...
  },
  "patternProperties": {
      REGEX: SCHEMA,              // Validate propertynames matched by regex with the schema defined in SCHMEA
      ...
  },
  "additionalProperties": SCHEMA, // False to disallow, otherwise validate against SCHEMA
  "unevaluatedProperties": BOOL,  // Overcomes issues with `additionalProperties: false` when using schema composition. 
  "required": ARRAY,              // Array of unique strings that are required property names.
  "propertyNames": SCHEMA,        // Validate property names with SCHEMA.  { "type": "string" } is implied.
  "minProperties": INTEGER,      //
  "maxProperties": INTEGER,
  ...
}
```
### `array`

```js
{
  "type": "array",
  "prefixItems": [ SCHEMA,... ],  // Tuple of Schemas used to validate each element of the array (no used with "items").
  "items": SCHEMA,                // Schema used to validate all following items in the array.
  "contains": SCHEMA,             // Must validate against one or more elements in the array.
  "minContains": INTEGER,         // Number of elements the "contains" Schema must validate against,
  "maxContains": INTEGER,
  "minItems": INTEGER,            // Number of elements in the array.
  "maxItems": INTEGER,
  "uniqueItems": Boolean          // Ensure that each element in the array is unique.  
}
```

### `boolean`

Only matches absolute value of `true` or `false`.  That is it does not evaluate 'truthy' values such as 0 or 1.  No
further keywords available for boolean.

{ "type": "boolean" }

### `null`

Only validates against `null`. No further keywords.

{ "type": "null" }


## Generic Keywords

```js
"title":        STRING  // Short description
"description":  STRING  // Longer Description: Perhaps CommonMarkdown
"default":      STRING  // Example value for documentation.  NOTE: Not used for validation or replacing missing values.
"examples":     ARRAY   // List of Examples that validate against the schema. No need to duplicate the "default" value.
"readOnly":     BOOL    // Hint to concumers about API constraints that will be imposed.
"writeOnly":    BOOL
"deprecated":   BOOL    // Indicated that this schema item should not be used and may be removed in the future.
"$comment":     STRING  // Should be completely ignored by any downstream consumer or validation engine.
"enum":         ARRAY   // An array of valid
"const":        VALUE   // Must equal the value.
```

```js
"constentMediaType":
"contentEncoding":
```

## Schema Composition

```js
"allOff": [SCHEMA, ...],
"anyOf":  [SCHEMA, ...],
"oneOf":  [SCHEMA, ...],
"not":    SCHEMA
```

You can factor out common parts.

```js
{
  "type": "number",
  "oneOf": [
    { multipleOf: 5 },
    { multipleOf: 3 }
  ]
}
```

## Conditional Sub-schemas

```js
dependentRequired
dependentSchemas   // Applied like the use of `allOf`
"if":  SCHEMA,
"then": SCHEMA,
"else": SCHEMA
```

## Structuring a complex schema

***Note***

URI terminology can sometimes be unintuitive. In this document, the following definitions are used.

- [URI](https://datatracker.ietf.org/doc/html/rfc3986#section-3) or non-relative URI: A full URI containing a scheme (https). It may contain a URI fragment (#foo). Sometimes this document will use “non-relative URI” to make it extra clear that relative URIs are not allowed.
- [relative reference](https://datatracker.ietf.org/doc/html/rfc3986#section-4.2): A partial URI that does not contain a scheme (https). It may contain a fragment (#foo).
- [URI-reference](https://datatracker.ietf.org/doc/html/rfc3986#section-4.1): A relative reference or non-relative URI. It may contain a URI fragment (#foo).
- [absolute URI](https://datatracker.ietf.org/doc/html/rfc3986#section-4.3): A full URI containing a scheme (https) but not a URI fragment (#foo).
 
***Note***

Even though schemas are identified by URIs, those identifiers are not necessarily network-addressable. They are just
identifiers. Generally, implementations don’t make HTTP requests (`https://`) or read from the file system (`file://`)
to fetch schemas. Instead, they provide a way to load schemas into an internal schema database. When a schema is
referenced by its URI identifier, the schema is retrieved from the internal schema database.
See documentations for further discussion. Here are the options for referencing schemas:

Base URI determination and relative reference resolution is defined
by [RFC-3986](https://datatracker.ietf.org/doc/html/rfc3986#section-5). If you are familiar with how this works in HTML,
this section should feel very familiar.

Retrieval URI is the URI used to reference the scheme, even if it wasn't actually 'fetched' from anywhere but instead
defined in a local lookup structure in memory.

`$id: STRING` is a URI-reference without a fragment that resolves against the Retrieval URI. The resulting URI is the
base URI for the schema.  ***It’s recommended that you always use an absolute URI when declaring a base URI with `$id`.***

[JSON Pointer](https://tools.ietf.org/html/rfc6901)

`$anchor` can be used to defined a particular part of a schema that can be addressed using URI fragments.  Not common.

`$ref` is a URI reference that is resolved against the Base URI to retrieve the referenced schema and apply it.

`$def` is a way to reference sub-schemas that are 'defined locally' for use in the current schema/s.

### Recursion

```js
{
  "type": "object",
    "properties": {
    "name": { "type": "string" },
    "children": {
      "type": "array",
        "items": { "$ref": "#" }
    }
  }
}
```

***Note***: *A `$ref` referring to another `$ref` could cause an infinite loop in the resolver, and is explicitly
disallowed.*

### [Bundling](https://json-schema.org/understanding-json-schema/structuring.html#bundling)

[See docs](https://json-schema.org/understanding-json-schema/structuring.html#bundling).

