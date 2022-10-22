const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sessions = require("express-session");
const mongoose = require("./database-config/connect");
const auth = require("./middleware/auth");

const indexRouter = require("./routes/index");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");
const adminRouter = require("./routes/admin");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

if (process.env.NODE_ENV !== "production") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.engine('hbs', hbs.engine({
//   extname: "hbs",
//   defaultLayout: "layout",
//   layoutDir: `${__dirname}/views/layout`,
//   partialsDir:`${__dirname}/views/partials`
// }))

//Session Management

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use("/", indexRouter);
app.use("/teacher", auth.isAuthorized, teacherRouter);
app.use("/student", auth.isAuthorized, studentRouter);
app.use("/admin", auth.adminAuthorized, adminRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
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
