const router = require("express").Router();
const passport = require("passport");
const { check } = require("express-validator");
const authCtrl = require("../controller/auth.controller");

router.route("/signin").post(
  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Enter Valid Email"),
  check("password").notEmpty().withMessage("Password Required"),
  passport.authenticate("local"),
  (req, res, next) => {}
);

router
  .route("/signup")
  .post(
    check("email")
      .notEmpty()
      .withMessage("Email Required")
      .isEmail()
      .withMessage("Enter Valid Email"),
    check("name").notEmpty().withMessage("Name is required"),
    check("password")
      .notEmpty()
      .withMessage("Password Required")
      .isLength({ min: 6 })
      .withMessage("must be atleast 6 characters")
      .matches("^(?=.*[A-Z])(?=.*[0-9])")
      .withMessage("password must contain atleast one uppercase and digit"),
    authCtrl.signup
  );

module.exports = router;
