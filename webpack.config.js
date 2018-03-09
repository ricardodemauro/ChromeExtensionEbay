const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const copyOptions = { debug: 'info' }

module.exports = {
  entry: {
    'main': path.join(__dirname, 'app', 'index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/app')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/*.html', to: '../' },
      { from: 'images/*.*', to: '../app' },
      { from: 'app/*.json', to: '../' }
    ], copyOptions)
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};