import { rollup, watch } from 'rollup';
import loadConfigFile from 'rollup/loadConfigFile';
import path from 'path';

import process from 'process';
import { babel } from '@rollup/plugin-babel';

const inputOptions = {
  input: 'src/index.js',
  external: [],
  plugins: [ babel( { babelHelpers: 'runtime' } ) ]
};

const outputOptions = {
  file: '_build/bundle.mjs',
  format: 'es',
  name: 'SquibbleDomain',
  plugins: []

};

const build = async ( inputOptions, outputOptions ) => {
  let bundle = null;
  let buildFailed = false;

  try {
    bundle = await rollup( inputOptions );
    console.log( bundle.watchFiles );
    await generateOutputs( bundle, outputOptions );
  } catch ( err ) {
    buildFailed = true;
    console.log( err );
  }

  if( bundle ) await bundle.close();
  process.exit( buildFailed ? 1 : 0 );
};

const generateOutputs = async ( bundle, options ) => {
  const { output } = await bundle.generate( options );
  for ( const chunkOrAsset of output ) {
    if ( chunkOrAsset.type === 'asset' ) console.log( 'Asset', chunkOrAsset )
    else console.log( 'Chunk', chunkOrAsset.modules );
  }
};

const watchOptions = {
  chokidar: true,
  clearScreen: true,
  buildDelay: 100
};

const watcher = watch( { ...inputOptions, output: outputOptions, watch: { ...watchOptions } } );

watcher.on( 'event', console.log );

//build( inputOptions, outputOptions ).then( console.log );
