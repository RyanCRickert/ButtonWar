const path = require("path");
const webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  }
};