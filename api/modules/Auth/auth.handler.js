const jwt = require('jsonwebtoken');
const { userModel } = require('../Users/user.model');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return res.send({
        status: 'Token Invalid',
      });
    }

    const decoded = jwt.verify(token, 'kjasdhjafkncjasd71ej77ads');

    if (decoded.exp === Date.now()) {
      try {
        res.status(200).send({
          status: 'sukses',
        });
      } catch (error) {
        if (error.name === jwt.TokenExpiredError)
          res.status(401).send({ message: error.message });
      }
    }

    const foundUser = await userModel
      .findOne({ username: decoded.username })
      .select('username');
    if (!foundUser) {
      return res.send('Silahkan login kembali');
    }

    next();
  } catch (error) {
    res.status(401).send({
      status: 'Silahkan Login Kembali',
    });
  }
};
