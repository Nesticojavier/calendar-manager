var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { Users, Credential } = require("./Models/Users");

// Synchronize model
Users.sync().then(() => {
  console.log("Users Model synced 2");
});
Credential.sync().then(() => {
  console.log("Credential Model synced 2");
});

var app = express();

// view engine setup (Settings)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var providerRouter = require("./routes/provider");

app.use(indexRouter);
app.use(authRouter);
app.use("/provider", providerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
