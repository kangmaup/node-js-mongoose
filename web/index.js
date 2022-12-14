const { default: axios, AxiosHeaders } = require('axios');
const { response } = require('express');
var express = require('express');
const { handlebars } = require('hbs');
const { verify } = require('jsonwebtoken');
const { authJWT } = require('../api/modules/Users/user.auth');
const router = express.Router();

/* GET home page. */
router.route('/').get((req, res) => {
  res.redirect('/login');
});

router.route('/login').get(async (req, res) => {
  res.render('auth/login', {
    title: 'Express',
  });
});

router.route('/submit_login').post(async (req, res) => {
  const getLogin = await axios({
    method: 'post',
    url: 'http://localhost:5000/api/login',
    data: {
      username: req.body.username,
      password: req.body.password,
    },
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const token = getLogin.data.token;
  res
    .cookie('access_token', token, {
      // expires: new Date(Date.now() + 8 * 3600000),
      // httpOnly : true
    })
    .redirect('/thank-you');
});

router.route('/thank-you').get(authJWT, (req, res) => {
  res.render('auth/thank-you');
});
router.route('/logout').get((req, res) => {
  res.render('auth/login');
});

module.exports = router;
