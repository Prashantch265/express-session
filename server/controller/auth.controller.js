const User = require("../../database/models/user.model");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw errors;
    }

    let currentUser = await User.findOne({
      where: { email: email },
    });

    if (currentUser) {
      return res.status(400).json("user already existed");
    }

    let user = User.build({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    let message = "Successfully signed up!";

    return res.redirect(200, "/login");
  } catch (err) {
    console.log(err);
    return res.status(400).render("register.ejs", { err: err });
  }
};


const signin = async (email, password) => {

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw { errors: "Incorrect Email or Password"};
    }

    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { err: "user not found" };
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return user;
      } else {
        return {err: "password didn't match"};
      }
    }
  } catch (err) {
    return err;
  }
}

const findUser = async (uid) => {
    try {
        let user = await User.findOne({where: {uid: uid}});

        return user;
    } catch (err) {
        return err;
    }
}

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(401).json({ msg: 'You are not authorized to view this resource' });
  }
}

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
      next();
  } else {
      res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
  }
}

module.exports = {signup, signin, findUser, isAuth, isAdmin};
