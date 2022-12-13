const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const { userModel } = require('./user.model');
const LocalStrategy = require('passport-local');
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv').config();

const addUser = async (req, res, next) => {
  try {
    await userModel.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });
    res
      .json({
        status: 'Sukses',
      })
      .status(201);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    userModel.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.matchPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

const authLocal = passport.authenticate('local',{ session:false })

const cookieExtractor = req => {
  let jwt = null 

  if (req && req.cookies) {
      jwt = req.cookies['access_token']
  }
  console.log(jwt);
  return jwt
}
const jwtOpts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(
  new JWTstrategy(jwtOpts,
    async (token, done) => {
      try {
        const user = await userModel.findOne({username : token.username});
        
        if(!user){
          return done(null,false);
        }
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
const authJWT = passport.authenticate('jwt', {session:false});
module.exports = {authJWT,authLocal};