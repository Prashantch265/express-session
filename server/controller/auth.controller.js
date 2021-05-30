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

    let user = User.build({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    let message = "Successfully signed up!";

    return res.status(200).render("register.ejs", { msg: message });
  } catch (err) {
    console.log(err);
    return res.status(400).render("register.ejs", { err: err });
  }
};


const signin = async (email, password) => {

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw errors;
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

const findUser = async (id) => {
    try {
        let user = await User.findOne({where: {id: id}});

        return user;
    } catch (err) {
        return err;
    }
}

module.exports = {signup, signin, findUser};
