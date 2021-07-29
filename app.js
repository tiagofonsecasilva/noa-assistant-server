// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// const session = require("express-session");
// app.set("trust proxy", 1)
// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       sameSite: "none", //frontend backend both run on localhost
//       httpOnly: false, //we are not using https
//       maxAge: 60000, //session time
        // secure: true
//     },
//     rolling: true,
//   })
// );

// default value for title local
const projectName = "project-management-server";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const project = require("./routes/project-routes");
app.use("/api", project);

const auth = require("./routes/auth-routes");
app.use("/api", auth);

const course = require("./routes/course-routes");
app.use("/api", course);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
