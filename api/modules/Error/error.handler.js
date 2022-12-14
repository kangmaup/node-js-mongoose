exports.errorHandler500 = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ error: err });
};
exports.errorHandler400 = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(400);
  res.json({ error: err });
};
exports.errorHandler401 = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res
      .send({
        status: 'Failed',
        message: 'Invalid Token',
      })
      .status(401);
  } else {
    next(err);
  }
};
