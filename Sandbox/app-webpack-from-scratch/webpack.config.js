import webpack                from 'webpack'
import PACKAGE                from './package.json' assert { type: 'json' }
import { GitRevisionPlugin }  from 'git-revision-webpack-plugin'
import HtmlWebpackPlugin      from 'html-webpack-plugin'


const gitRevisionPlugin = new GitRevisionPlugin( {
  branch: true,
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: "postcss-loader", options: { postcssOptions: { plugins: ()=> [ require('autoprefixer') ] } } },
          'sass-loader'
        ]
      },
      {
        test: /\.(css)$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    libraryTarget: 'var',
    library:  'Squirrel_Squabble'
  },
  devServer: {
    port: 8001,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: JSON.stringify( PACKAGE.name + ' ' + gitRevisionPlugin.version() ),
      startupTheme: JSON.stringify('zephyr'),
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
