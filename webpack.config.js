/** @type {import('webpack').Configuration} */

const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'micro-social',
  entry: {
    auth: path.resolve(__dirname, 'src/main.js'),
    posts: path.resolve(__dirname, 'posts/index.js'),
    db: path.resolve(__dirname, 'db/index.js')
  },
  target: 'node',
  mode: 'production',
  externals: [webpackNodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
