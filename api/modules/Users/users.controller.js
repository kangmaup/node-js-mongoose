const router = require('express').Router();
const { session } = require('passport');
const passport = require('passport');
const { authJWT, authLocal, verifyJWT, verifyUserLocal } = require('./user.auth');

const {
  createUser,
  getUser,
  updateUsers,
  deleteUsers,
  userLogin,
  getUserByUsername,
  logout,
  getUserPostgre,
  userLoginPG,
} = require('./user.handler');
const { userModel } = require('./user.model');

router.route('/register').post(createUser);
router.route('/getUsers').get(getUser)
router.route('/profile').get(verifyJWT, getUserByUsername);
router.route('/login').post(verifyUserLocal, userLoginPG);
router.route('/testPostgre/:id').get(getUserPostgre);
router.route('/all').get(getUser);
router.route('/testsign').get(userLoginPG);
// router.route('/login').post((req,res)=>{
// //  console.log(req.body.username);
//   userModel.findOne({username : req.body.username})
//  .exec((err,data)=>{
//   console.log(data);
//   if(!data){
//    return res.status(400).send({
//     status : 'Fail',
//     message : 'User Tidak Ditemukan'
//    });
//   }
//   data.matchPassword(req.body.password)
//   .then((match)=>{
//     console.log(match);
//     if(!match){
//       return res.status(400).send({
//         status : 'Fail',
//         message : 'Password Tidak Sama'
//        });
//     } else{
//       return res.status(200).send({
//         status : 'Sukses',
//         message : 'Berhasil Login'
//        });
//     }
//   });

//   })

// });


// router.route('/logout')
// .get((req,res)=>{
//   req.logout((err)=>{
//     console.log(err);
//   })
//   res.send({
//     status : 'Berhasil Logout'
//   }).status(200);
// })
router.route('/logout').get(logout);


module.exports = router;
