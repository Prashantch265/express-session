const router = require("express").Router();

router.route("/login").get((req, res) => {
  res.status(200).render("login.ejs");
});

router.route("/register").get((req, res) => {
  res.status(200).render("register.ejs");
});

module.exports = router;
