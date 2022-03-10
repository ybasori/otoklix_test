/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

require("dotenv").config();

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/server/index.ts",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        exclude: [path.resolve(__dirname, "../node_modules")],
        loader: "ignore-loader",
      },
    ],
  },
  output: {
    clean: true,
    path: path.resolve("dist"),
    filename: "server.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
