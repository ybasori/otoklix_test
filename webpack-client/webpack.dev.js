/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");

require("dotenv").config();

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "../public"),
    },
    proxy: {
      "*": {
        target: `http://localhost:${process.env.PORT}/`,
        changeOrigin: true,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: process.env.DEV_PORT,
  },
  output: {
    clean: true,
    publicPath: `http://localhost:${process.env.DEV_PORT}/assets/`,
  },
  entry: {
    client: `webpack-dev-server/client`,
    hot: "webpack/hot/only-dev-server",
  },
});
