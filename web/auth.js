const { default: axios } = require('axios');
const { response } = require('express');
var express = require('express');
const { handlebars } = require('hbs');
const router = express.Router();

router.post('/auth_login',async function(req, res, next) {
    const respon = await axios.post('http://localhost:5000/api/login')
    
    
    res.cookie('access_token', respon.data.data.token).render('auth/login', { 
        title: 'Express',
    });
    // console.log(req.cookies);
});

module.exports = router;