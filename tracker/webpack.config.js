const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.resolve(__dirname, 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '/',
    filename: './tracker.js',
    libraryTarget: 'var',
    library: 'rdTracker'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
};
