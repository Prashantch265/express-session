const express = require("express");
const session = require("express-session");
const SessionStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const morgan = require("morgan");
const config = require("../config/config.json");
const { stream } = require("./utils/logger");
const sequelize = require("../database/models/index");
// const Sessions = require("../database/models/session.model");
const customFields = require("./lib/customFields");
const pageRoute = require("./routes/page.route");
const authRoute = require("./routes/auth.route");

const app = express();

(config.env === "development") ? app.use(morgan("dev", {stream})) : app.use(morgan("combined", {stream}));

const sequelizeSessionStore = new SessionStore({
  db: sequelize,
  // table: Sessions,
  // extendDefaultFields: customFields.extendDefaultFields,
  expiration: 5 * 60 * 1000, //5 min
});

// const sessionStore = new pgSession({tableName: "Sessions"});

require("./lib/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "YOUR_SECRET",
    store: sequelizeSessionStore,
    saveUninitialized: false,
    resave: false,
    ssl: true,
    cookie: {
      maxAge: 1000 * 60, //1 min
    },
  })
);

/**
 * Notice that these middlewares are initialized after the `express-session` middleware.  This is because
 * Passport relies on the `express-session` middleware and must have access to the `req.session` object.
 *
 * passport.initialize() - This creates middleware that runs before every HTTP request.  It works in two steps:
 *      1. Checks to see if the current session has a `req.session.passport` object on it.  This object will be
 *
 *          { user: '<DB user ID>' }
 *
 *      2.  If it finds a session with a `req.session.passport` property, it grabs the User ID and saves it to an
 *          internal Passport method for later.
 *
 * passport.session() - This calls the Passport Authenticator using the "Session Strategy".  Here are the basic
 * steps that this method takes:
 *      1.  Takes the user ID obtained from the `passport.initialize()` method (run directly before) and passes
 *          it to the `passport.deserializeUser()` function (defined above in this module).  The `passport.deserializeUser()`
 *          function will look up the User by the given ID in the database and return it.
 *      2.  If the `passport.deserializeUser()` returns a user object, this user object is assigned to the `req.user` property
 *          and can be accessed within the route.  If no user is returned, nothing happens and `next()` is called.
 */

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

module.exports = app;
