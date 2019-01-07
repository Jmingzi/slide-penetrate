const path = require('path')

module.exports = {
  entry: {
    // penetrate: './m-dist/penetrate-babel.js'
    penetrate: './src/views/scroll.js'
  },
  output: {
    path: path.resolve(__dirname, './m-dist'),
    filename: '[name].js',
    library: 'penetrate',
    libraryTarget: 'umd'
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
