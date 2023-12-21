const mongoose = require("mongoose");
const express = require("express");
const app = express();
const jwt = require("./jwt");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const userController = require("./usercontroller");
const cors = require("cors");
var dbo;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
const port = process.env.PORT || 4000;
app.use("/user", userController);

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
});
// const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect("mongodb://127.0.0.1:27017");
mongoose.Promise = global.Promise;
app.listen(port, () => console.log("server"));

module.exports = {
  dbo,
};
