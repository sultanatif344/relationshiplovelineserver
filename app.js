const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
var dbo;
const cors = require("cors");
const jwt = require("./jwt");
const auth = require("./usercontroller");

app.use(cors());
app.use(jwt());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

module.exports = {
  app,
  dbo,
};
