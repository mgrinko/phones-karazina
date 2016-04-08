'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: "./frontend/js/app.js",
  output: {
    path: __dirname + '/public',
    filename: "build.js"
  },
  //
  //externals: {
  //  lodash: '_'
  //},

  watch: true,
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, '/frontend/js'),
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }

    ]
  },

  //plugins: [
  //  new webpack.optimize.UglifyJsPlugin({
  //    compress: {
  //      warnings: false
  //    }
  //  })
  //]

};

