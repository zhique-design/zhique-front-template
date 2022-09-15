const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = {
  mode: production ? "production" : "development",
  devtool: production ? false : "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
      {
        test: /\.((c|le)ss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              modules: {
                namedExport: false,
              },
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]-[local]-[contenthash:8]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.((c|le)ss)$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|eot|woff|ttf|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  entry: {
    app: path.resolve(__dirname, "src", "index.tsx"),
  },
  output: {
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].chunk.[hash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  optimization: {
    nodeEnv: false,
    splitChunks: {
      chunks: "all",
      name: false,
      maxSize: 200000,
      automaticNameDelimiter: ".",
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  plugins: [
    new WebpackBar({ profile: true }),
    new HtmlWebpackPlugin({
      title: "知雀",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist")],
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].chunk.[contenthash:8].css",
      ignoreOrder: true,
    }),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true,
      overrideConfigFile: path.join(__dirname, ".eslintrc.js"),
      fix: true,
    }),
    new StylelintPlugin({
      context: "src",
      configFile: path.resolve(__dirname, ".stylelintrc"),
      files: "**/*.(css|less)",
      fix: true,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
