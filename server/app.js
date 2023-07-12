var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt"); //To encrypt passwords

// require enviroments variables file
require("dotenv").config();

// Import Models
const { Users, Credential } = require("./Models/Users");
const { Work } = require("./Models/Work");
const { Tags, WorkTags, UserTags } = require("./Models/Tags");
const { UserBlocks } = require("./Models/Blocks");
const { Admin, createOrFindAdmin } = require("./Models/Admin");
const { Postulation } = require("./Models/Postulation");
const { Tracking } = require("./Models/Tracking");

// Synchronize model
(async () => {
  await Users.sync({ force: false }).then(() => {
    console.log("Users Model synced 2");
  });
  await Credential.sync({ force: false }).then(() => {
    console.log("Credential Model synced 2");
  });

  await Work.sync({ force: false }).then(() => {
    console.log("Work Model synced 2");
  });

  await Tags.sync({ force: false }).then(() => {
    console.log("Tags Model synced 2");
  });

  await WorkTags.sync({ force: false }).then(() => {
    console.log("WorkTags Model synced 2");
  });

  await UserTags.sync({ force: false }).then(() => {
    console.log("UserTags Model synced 2");
  });

  await UserBlocks.sync({ force: false }).then(() => {
    console.log("UserBlocks Model synced 2");
  });

  await Admin.sync({ force: false }).then(() => {
    console.log("Admin Model synced 2");
    // Create admin
    createOrFindAdmin(process.env.ADMIN_USER, process.env.ADMIN_PWD);
  });

  await Postulation.sync({ force: false }).then(() => {
    console.log("Postulation Model synced 2");
  });

  await Tracking.sync({ force: false }).then(() => {
    console.log("Tracking Model synced 2");
  });
})();

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
var adminRouter = require("./routes/admin");
var volunteerRouter = require("./routes/volunteer");
var utilsRouter = require("./routes/utils");
var reportsRouter = require("./routes/reports")

app.use(indexRouter);
app.use(authRouter);
app.use(utilsRouter);
app.use("/provider", providerRouter);
app.use("/admin", adminRouter);
app.use("/volunteer", volunteerRouter);
app.use("/report", reportsRouter);

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
