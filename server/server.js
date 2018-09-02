const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql"); // CommonJS
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const db = require("../mongoConfig");
const seed = require("./seed");
const app = express();
const cors = require("cors");
// mongolab URI
const MONGO_URI = `mongodb://${db.user}:${
  db.pass
}@ds139341.mlab.com:39341/connect4`;
const dev = process.env.NODE_ENV === "development";

if (!db.user || !db.pass) {
  throw new Error("You must provide database user and password");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());
// routes
// app.options("/graphql", cors());
// app.use("/graphql", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "content-type, authorization, content-length, x-requested-with, accept, origin"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   res.header("Allow", "POST, GET, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
// app.use(
//   "/graphql",
//   expressGraphQL(() => ({
//     schema,
//     graphiql: true
//   }))
// );

// app.use('/',
// (req, res, next) => {
//   console.log('asdasdasd ', req);
//   next();
// })
// app.use("/", (req, res, next) => {
//   console.log("ROOT ");
//   next();
// });
app.use(
  "/graphql",
  cors(),
  (req, res, next) => {
    console.log("-GRAPH");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "content-type, authorization, content-length, x-requested-with, accept, origin"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Allow", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    console.log("HERE");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  },
  expressGraphQL({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.use("/seed", seed);
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
