const {resolve} = require('path')

module.exports = {
  output: {
    path: resolve(__dirname, "../dist"),
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}