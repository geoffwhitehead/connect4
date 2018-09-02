const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const schema = require('./schema/schema');
const { DB_USER, DB_PASS } = require("../mongoConfig");

const app = express();

// mongolab URI
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@ds139341.mlab.com:39341/connect4`;

if (!DB_USER || !DB_PASS) {
  throw new Error(
    "You must provide database user and password that was sent via email"
  );
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab"))
  .on("error", error => console.log("Error connecting to MongoLab: ", error));

app.user(bodyParser.json());
app.use(
  "graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
