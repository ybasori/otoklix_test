/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const commonClient = require("./webpack-client/webpack.common.js");
const commonServer = require("./webpack-server/webpack.common.js");

require("dotenv").config();

const config = {
  mode: "production",
  devtool: "source-map",
};

const server = merge(commonServer, {
  ...config,
  output: {
    clean: true,
  },
});

const client = merge(commonClient, {
  ...config,
  output: {
    clean: true,
  },
});

module.exports = [server, client];
