const {resolve} = require('path')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require("./webpack.base");

const { merge } = require("webpack-merge");



module.exports = merge(baseConfig, {
  devtool: 'eval-cheap-source-map',
  mode: 'development',
  entry: resolve(__dirname, '../src/client/entry.client.jsx'),
  devServer: {
    static: resolve(__dirname, '../dist'),
    port: 8000,
        /* 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容。
     * 将 devServer.historyApiFallback 设为 true开启：
     **/
        historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../src/client/index.template.html"),
    }),
  ]
}


)