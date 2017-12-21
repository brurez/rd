const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '/',
    filename: './tracker.js'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
};
