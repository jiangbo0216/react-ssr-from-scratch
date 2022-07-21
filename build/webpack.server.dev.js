const baseConfig = require("./webpack.base");

const nodeExternals = require("webpack-node-externals");

const { merge } = require("webpack-merge");

const {resolve} = require('path')


module.exports = merge(baseConfig, {
  mode: 'development',
  entry: resolve(__dirname, "../src/client/entry.server.jsx"),
  output: {
    filename: "server.bundle.js",
    libraryTarget:"commonjs2"
  },
  target:"node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "ignore-loader",
      },
    ],
  },

})