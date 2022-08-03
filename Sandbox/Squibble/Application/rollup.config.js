import gitInfo from 'rollup-plugin-git-info'
import eslint from '@rollup/plugin-eslint'

//import replace from '@rollup/plugin-replace'
//import { babel } from '@rollup/plugin-babel'
//import json   from '@rollup/plugin-json'
//import { nodeResolve } from '@rollup/plugin-node-resolve'
//import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'app.js',
  output: {
    file: './build/main.js',
    format: 'es',
    sourcemap: 'inline'
  },
  plugins: [
    gitInfo( { commitHashCommand: 'describe', versionFormat: '[commitHash]'}),
    eslint()
    //json(),
    //babel( { exclude: 'node_modules', babelHelpers: 'bundled' } ),
    //commonjs(),
    //nodeResolve()
  ]
};