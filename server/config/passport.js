const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let found = false;
    let usr;

    const users = await User.find({ username: username });
    if (!users) return done(null, false, { message: "Incorrect username" });

    for (eachUser of users) {
      const match = await bcrypt.compare(password, eachUser.password);
      if (match) {
        // passwords match! log user in
        found = true;
        usr = eachUser;
      }
    }

    if (found) return done(null, usr);
    return done(null, false, { message: "Invalid credentials" });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
