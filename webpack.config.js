const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    modules: ["client", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".json"]
  },
  entry: "./client/index.js",
  output: {
    path: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
