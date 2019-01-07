const webpack = require('webpack')
const path = require('path')


//   ["@babel/plugin-transform-runtime", {
//   "corejs": 2,
//   "helpers": true,
//   "regenerator": false,
//   "useESModules": false
// }]

module.exports = {
  entry: {
    // penetrate: './m-dist/penetrate-babel.js'
    penetrate: './src/views/scroll.js'
  },
  output: {
    path: path.resolve(__dirname, './m-dist'),
    filename: '[name].js',
    library: 'penetrate',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: '#source-map',
}
