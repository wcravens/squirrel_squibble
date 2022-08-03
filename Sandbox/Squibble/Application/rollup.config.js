import gitInfo from 'rollup-plugin-git-info'
import eslint from '@rollup/plugin-eslint'

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