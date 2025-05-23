const {
  override,
  addWebpackModuleRule,
  addWebpackPlugin,
} = require("customize-cra");
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const customizeOutput = () => (config) => {
  config.context = path.resolve(__dirname);
  config.output = {
    ...config.output,
    path: path.resolve(__dirname, "docs"),
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/chunk.js",
    clean: true,
  };
  return config;
};

module.exports = override(
  addWebpackPlugin(
    new MiniCssExtractPlugin({
      filename: "static/css/styles.css",
    })
  ),
  addWebpackModuleRule({
    test: /\.md$/,
    use: "raw-loader",
  }),
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      // use MiniCssExtractPlugin in dev, use style-loader when running build
      // MiniCssExtractPlugin.loader,
      "style-loader",
      "css-loader",
      "sass-loader",
    ],
  }),
  addWebpackModuleRule({
    test: /\.(png|jpe?g|gif|svg)$/i,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
      outputPath: "images",
    },
  }),
  customizeOutput()
);
