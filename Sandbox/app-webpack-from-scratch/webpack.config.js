const webpack = require('webpack');
const PACKAGE = require('./package.json')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin( {
  branch: true,
});

module.exports = {
  mode: 'development',
  devServer: {
    port: 8001,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: JSON.stringify( PACKAGE.name + ' ' + gitRevisionPlugin.version() ),
      template: './public/index.html'
    }),
    gitRevisionPlugin,
    new webpack.DefinePlugin({
      'VERSION':            JSON.stringify(gitRevisionPlugin.version()),
      'COMMITHASH':         JSON.stringify(gitRevisionPlugin.commithash()),
      'BRANCH':             JSON.stringify(gitRevisionPlugin.branch()),
      'LASTCOMMITDATETIME': JSON.stringify(gitRevisionPlugin.lastcommitdatetime()),
    }),
  ],
}
