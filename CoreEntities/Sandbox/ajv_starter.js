import Ajv from 'ajv'
const ajv = new Ajv()

const SCHEMA = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    //bar: { type: "string" },
    bar: { const: 1 }
  },
  required: ["foo"],
  additionalProperties: false
}

const DATA = {
  foo: 1,
  bar: "abc"
}

const validator = ajv.compile( SCHEMA )

const validate = obj => validator( obj ) ? "Yup, it's valid." : `Not Valid: ${ validator.errors[0].message }!`

console.log( validate( DATA ) )
console.log( validate( { ...DATA, baz: "boo"} ) ) // Specified additionalProperties: false
