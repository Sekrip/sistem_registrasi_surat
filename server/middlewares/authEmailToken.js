const JwtHelper = require('../helpers/JwtHelper');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    const email_token = req.query.email_token
    const email = JwtHelper.verifyToken(email_token)
    req.email = email
    next()
  } catch (error) {
    next(createError(401, { name: 'Unauthorized', message: 'Token kadaluarsa' }))
  }
}