
//import path from 'path';
//import serve from 'rollup-plugin-serve';
//import livereload from 'rollup-plugin-livereload';
import { babel } from '@rollup/plugin-babel';
import nodePolyFills from 'rollup-plugin-polyfill-node';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import del from 'rollup-plugin-delete';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import pgk from './package.json';

const isProduction = false;

export default {
  input: "App.js",
  output: {
    file: "_build/main.js",
    format: "es",
    name: 'Squibble',
    sourcemap: 'inline',
  },
  /*onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },*/
  plugins: [
    del( { targets: "_build/*" } ),
    //eslint(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
    }),
    alias( { entries: { 'string_decoder/': 'string_decoder' } }),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    commonjs({ strictRequires: true }),
    nodeResolve({ preferBuiltins: true, dedupe: ['write-stream', 'readable-stream' ] }),
    nodePolyFills(),
    json({ compact: true }),
  ]
};
