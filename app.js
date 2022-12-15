var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const usersRouter = require('./api/modules/Users/users.controller');
const viewRouter = require('./web/index');
const blogRouter = require('./api/modules/Blog/blog.controller');
const authRouter = require('./api/modules/Auth/auth.routes');
const passport = require('passport');
const error = require('./api/modules/Error/error.handler');
const { mongoDB } = require('./config/database.config');
const { default: helmet } = require('helmet');
const {
  rateLimiterMiddleware,
} = require('./Middlewares/rate-limiter.middleware');
const { client } = require('./config/redis.config');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//express-session

// console.log(require('dotenv').config({ path: path.resolve('./.env') }));
app.use(helmet());
app.use(rateLimiterMiddleware);
app.use(function (req, res, next) {
  res.setHeader('access-control-allow-origin', '');
  next();
});
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

//routes
app.use('/', viewRouter);
app.use('/api', usersRouter);
app.use('/web', blogRouter);

app.post('/test', (req, res) => {
  console.log(req.body);
  console.log('/test');
});

app.all('*', (req, res, next) => {
  res
    .send({
      status: 'Failed',
      message: "Can't Find URL on this server",
    })
    .status(404);
});

//view engine setup
app.set('views', path.join(__dirname, 'view'));
console.log(app.get('views'));
app.set('view engine', 'hbs');

// error handler

app.use(error.errorHandler401);

app.use(error.errorHandler500);
app.use(error.errorHandler400);

//connect database
mongoDB.on('error', (error) => console.error(error));
mongoDB.once('open', () => console.log('Database Connected'));

//redis

(async() => {

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
console.log(client.isReady);  
if(client.isReady){
  console.log('Redis Connected')
}else{
  console.log('Redis Not Connected')
}

})();

module.exports = app;
