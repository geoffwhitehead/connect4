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
        use: ["style-loader", "css-loader"],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html"
    }),
    new webpack.DefinePlugin({
      GRAPHQL_URI: JSON.stringify("https://localhost:4000/graphql")
    })
  ]
};
