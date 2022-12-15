const { RateLimiterMemory } = require('rate-limiter-flexible');

const MAX_REQUEST_LIMIT = 10;
const MAX_REQUEST_WINDOW = 15 * 60; // Per 15 minutes by IP
const TOO_MANY_REQUESTS_MESSAGE = 'To Many Login Attempted';

const options = {
  duration: MAX_REQUEST_WINDOW,
  points: MAX_REQUEST_LIMIT,
};

const rateLimiter = new RateLimiterMemory(options);

exports.rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip, 2)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ message: TOO_MANY_REQUESTS_MESSAGE });
    });
};
