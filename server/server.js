const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql"); // CommonJS
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
// const db = require("../mongoConfig");
const seed = require("./seed");
const app = express();
const cors = require("cors");
// mongolab URI
const USER = 'geoffwhitehead';
const PASS = 'connect1234';
const MONGO_URI = `mongodb://${USER}:${PASS}@ds139341.mlab.com:39341/connect4`;

if (!USER || !PASS) {
  throw new Error("You must provide database user and password");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.use("/seed", seed);
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
