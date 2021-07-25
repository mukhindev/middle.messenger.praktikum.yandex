const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 1 * 10 * 1000,
  max: 200,
});
