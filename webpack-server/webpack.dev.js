/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

require("dotenv").config();

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    clean: true,
  },
});
