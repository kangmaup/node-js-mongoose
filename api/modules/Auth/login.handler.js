const { sign } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const { compare } = require('../Users/user.handler');
const { userModel } = require('../Users/user.model');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res('Please provide email and password', 400);
  }

  console.log(await compare(username, password));

  const token = jwt.sign({ username: username }, 'kjasdhjafkncjasd71ej77ads', {
    expiresIn: 100,
    algorithm: 'HS256',
  });

  res.status(200).json({
    status: 'Sukses',
    token,
  });
};

// module.exports = {login}
