const { User } = require('../models/index');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findOne({ where: { id } })
    if(user != null){
      next()
    }else{
      throw (createError(404, { name: 'UserNotFound', message: 'Pengguna tidak terdaftar' }))
    }
  } catch (error) {
    next(error)
  }
  

}