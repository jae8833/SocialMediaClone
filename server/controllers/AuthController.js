const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("../config/passport");

exports.signup_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .escape()
    .withMessage("Password must be specified and at least 5 characters"),
  body("email").trim().escape(),
  body("bio").escape(),

  async (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({ err });
    }

    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(400).json({ err: "Username taken" });
    }

    bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,
        bio: req.body.bio,
        profilePic: req.body.profilePic,
        friends: [],
      });
      user.save((err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).json({ user });
      });
    });
  },
];

exports.login_post = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: info.message,
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};

exports.logout_post = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({ msg: "Logged out" });
  });
};
