const LocalStrategy = require("passport-local").Strategy;
const authCtrl = require("../controller/auth.controller");

/**
 * This function is called when the `passport.authenticate()` method is called.
 *
 * If a user is found an validated, a callback is called (`cb(null, user)`) with the user
 * object.  The user object is then serialized with `passport.serializeUser()` and added to the
 * `req.session.passport` object.
 */
module.exports = (passport) => {
  //  * This function is used in conjunction with the `passport.authenticate()` method.
  passport.serializeUser(function (user, cb) {
    cb(null, user.uid);
  });

  /**
   * This function is used in conjunction with the `app.use(passport.session())` middleware defined below.
   * Scroll down and read the comments in the PASSPORT AUTHENTICATION section to learn how this works.
   *
   * In summary, this method is "set" on the passport object and is passed the user ID stored in the `req.session.passport`
   * object later on.
   */
  passport.deserializeUser(function (uid, cb) {
    authCtrl.findUser(uid, function (err, user) {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });

  
  passport.use(
    new LocalStrategy((email, password, cb) => {
      authCtrl
        .signin(email, password)
        .then((user) => {
          if (!user) {
            return cb(null, false);
          } else {
            return cb(null, user);
          }
        })
        .catch((err) => cb(err, null));
    })
  );
};
