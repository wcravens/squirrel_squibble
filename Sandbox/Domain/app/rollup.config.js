import path from 'path';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import del from 'rollup-plugin-delete';
import pgk from './package.json';

const isProduction = false;

export default ( async () => ({
  input: "src/index.js",
  output: {
    file: "_build/bundle.mjs",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    del( { targets: "_build/*" }),
    eslint(),
    babel({
      babelHelpers: 'runtime',
      exclude: "**/node_modules/**"
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    nodeResolve({ extensions: [".js"] }),
    commonjs(),
    isProduction && (await import('rollup-plugin-terser')).terser(),
    serve({
      verbose: true,
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "_build" }),
  ]
}))();
