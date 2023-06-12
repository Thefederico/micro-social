/** @type {import('webpack').Configuration} */

const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  name: 'micro-social',
  entry: './cache/index.cache.js',
  target: 'node',
  mode: 'development',
  externals: [webpackNodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'micro-social-cache.js'
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
  },
  plugins: [
    new NodemonPlugin({
      script: './dist/micro-social-cache.js',
      watch: path.resolve('./dist'),
      ext: 'js,json',
      verbose: false,
      env: {
        NODE_ENV: 'development'
      }
    })
  ]
}
