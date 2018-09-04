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
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
        // use: [
        //   "style-loader",
        //   {
        //     loader: "sass-loader",
        //     options: {
        //       importLoaders: 1,
        //       modules: true,
        //       localIdentName: "[name]__[local]___[hash:base64:5]"
        //     }
        //   },
        //   "css-loader"
        // ]
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
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader", "sass-loader"]
      //   })
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
