var express = require('express');
const { hello } = require('./export');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

console.log(hello);

module.exports = router;
