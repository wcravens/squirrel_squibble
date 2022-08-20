import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import externals from 'rollup-plugin-node-externals';
import del from 'rollup-plugin-delete';
import pgk from './package.json';

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true
  },
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
  plugins: [
    del( { targets: "dist/*" } ),
    //externals( { deps: true } ),
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    babel({
      env: { development: { compact: false } },
      exclude: "**/node_modules/**",
      presets: ["@babel/preset-react"],
      babelHelpers: 'runtime'
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: [""],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
  ]
};
