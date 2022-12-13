const router = require('express').Router();
const { session } = require('passport');
const passport = require('passport');
const { protect } = require('../Auth/auth.handler');
const authPassport = require('../Auth/auth.passport');
const { login } = require('../Auth/login.handler');
const { authJWT, authLocal } = require('./user.auth');

const {
  createUser,
  getUser,
  updateUsers,
  deleteUsers,
  userLogin,
  getUserByUsername,
  logout,
} = require('./user.handler');
const { userModel } = require('./user.model');


router.route('/profile').get(authJWT,getUserByUsername);
router.route('/login').post(authLocal, userLogin);
router.route('/signup').post(createUser);
router.route('/all').get(getUser);
// router.route('/logout')
// .get((req,res)=>{
//   req.logout((err)=>{
//     console.log(err);
//   })
//   res.send({
//     status : 'Berhasil Logout'
//   }).status(200);
// })
router.route('/logout')
.get(logout);
router.route('/ping')
.get(authJWT,(req,res)=>{
  res.json('pong');
})



module.exports = router;
