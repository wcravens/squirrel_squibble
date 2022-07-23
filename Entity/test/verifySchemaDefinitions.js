const chai = require('chai');
//const definitionsSchema = require('../EntitySchema/definitions' );
//chai.use( require( 'chai-json-schema-ajv' ).create( {schemas : [ definitionsSchema ] } ));
chai.use( require( 'chai-json-schema-ajv' ) )
const expect = chai.expect;

//const fixture = require( './testFixtures' )

describe( 'Validate JSON Schema definitions', () => {
  [ 'Entity'] .forEach( entity => {
    const schemaFileName = entity + '.json';
    let schema = require( '../EntitySchemas/' + schemaFileName );
    it( schemaFileName + ' should be a valid JSON Schema definition.', () =>
      expect( fixtures[entity] ).to.be.jsonSchema( schema ) );
    const badId = { ...fixtures };
    badId.id = 'FooBad';
    it( schemaFileName + ' should not allow an invalid id.', () =>
      expect( badId ).to.not.be.jsonSchema( schema ) );
  });
});
