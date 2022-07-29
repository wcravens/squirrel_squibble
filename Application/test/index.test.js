import { expect } from 'chai'
import { appInit } from '../index.js'

describe( 'Application/index', () => {
  it( 'should export an appInit function', () =>{
    expect( appInit ).to.be.a( 'function' )
  })
  describe( 'appInit( CONFIG )', () => {
    it( 'should fail without a CONFIG argument')
  })
})


