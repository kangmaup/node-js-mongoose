const { default: axios } = require('axios');
const { response } = require('express');
var express = require('express');
const { handlebars } = require('hbs');
const { verify } = require('jsonwebtoken');
const { authJWT } = require('../api/modules/Users/user.auth');
const router = express.Router();

/* GET home page. */
router.route('/')
.get((req,res)=>{
    res.redirect('/login');
})

router.route('/login')
.get((req,res)=>{
    res.render('auth/login', { 
        title: 'Express',
    });
})

router.route('/thank-you')
.get(authJWT,(req,res)=>{
   res.render('auth/thank-you')
    
    
})
router.route('/logout')
.get((req,res)=>{
    res.render('auth/login');
})


module.exports = router;
