const LocalStrategy = require('passport-local');
const { userModel } = require('../Users/user.model');

module.exports.passportConfig = (passport) => {
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        username: 'username',
        password: 'password',
      },
      async (email, password, done) => {
        try {
          // check if user exists
          const userExists = await userModel.findOne({ username: username });
          if (userExists) {
            return done(null, false);
          }
          // Create a new user with the user data provided
          const user = await User.create({ email, password });
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = () => {
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        username: 'username',
        password: 'password',
      },
      async (username, password, done) => {
        try {
          const user = new userModel();
          const findUser = await user.findOne({ username: username });
          console.log(findUser);
          if (!findUser) return done(null, false);
          const isMatch = await user.matchPassword(password);
          if (!isMatch) return done(null, false);
          // if passwords match return user
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error, false);
        }
      }
    )
  );
};
