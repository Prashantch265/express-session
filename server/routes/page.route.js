const router = require("express").Router();
const authCtrl = require("../controller/auth.controller");

router.route("/login").get((req, res) => {
  res.status(200).render("login.ejs");
});

router.route("/register").get((req, res) => {
  res.status(200).render("register.ejs");
});

router.get('/protected-route', authCtrl.isAuth, (req, res, next) => {
  res.send('You made it to the route.');
});

router.get('/admin-route', authCtrl.isAdmin, (req, res, next) => {
  res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/protected-route');
});

module.exports = router;
