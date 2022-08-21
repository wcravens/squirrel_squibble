import path from 'path';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import eslint from '@rollup/plugin-eslint';
import pgk from './package.json';

const isProduction = false;

export default ( async () => ({
  input: "src/index.js",
  output: {
    file: "_build/bundle.js",
    format: "es",
    sourcemap: true,
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
    eslint(),
    babel({
      env: { development: { compact: false } },
      exclude: "**/node_modules/**",
      presets: ["@babel/preset-react"],
      babelHelpers: 'runtime'
    }),
    commonjs(),
    isProduction && (await import('rollup-plugin-terser')).terser(),
    serve({
      open: true,
      verbose: true,
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
  ]
}))();
