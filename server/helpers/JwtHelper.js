const jwt = require('jsonwebtoken');

class JwtHelper {

  static signToken(payload){
    return jwt.sign(payload, process.env.SECRET_KEY)
  }

  static verifyToken(token){
    return jwt.verify(token, process.env.SECRET_KEY)
  }

  static tokenChangePassword(payload){
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 185 })
  }

}

module.exports = JwtHelper