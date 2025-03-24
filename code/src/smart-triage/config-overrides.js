const webpack = require("webpack");
const { override, addWebpackPlugin } = require("customize-cra");

module.exports = override(
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  ),
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
    };
    return config;
  }
);
