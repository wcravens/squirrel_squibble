import importAssertions from 'rollup-plugin-import-assertions';

export default {
  input: 'src/main.js',
  output: {
    dir: '.'
  },
  plugins: [importAssertions()]
};
