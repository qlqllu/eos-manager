var path = require('path');
var fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'index': './index.js',
  },
  devtool: process.env.NODE_ENV === 'production'? 'source-map': 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'app',
      template: 'index.html',
      filename: 'index.html',
      inject: true,                 // we'll load modules through amd
    })
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
};
