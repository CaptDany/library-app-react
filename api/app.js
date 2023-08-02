var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var routerBooks = require("./routes/routes");

var app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Credentials", "false");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/library", routerBooks);

module.exports = app;
