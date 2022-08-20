import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import babelHelpers from '@babel/plugin-transform-runtime';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
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
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    babel({
      env: { development: { compact: false } },
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
