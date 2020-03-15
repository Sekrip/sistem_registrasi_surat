const { User } = require('../models/index');
const createError = require('http-errors');
const encrypt = require('../helpers/encryptHelper');
const jwtHelper = require('../helpers/JwtHelper');


class UserController {

  static async createAdmin(req, res, next){
    const value = {
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      password: req.body.password,
      nik: req.body.nik
    }

    try {
      const newAdmin = await User.create(value)
      res.status(200).json({
        statusCode: 200,
        body: newAdmin
      })
    } catch (error) {
      next(error)
    }
  }

  static loginAdmin(req, res, next){
    const { email, password } = req.body

    User
      .findOne({
        where : {
          email
        }
      })
      .then(response => {
        if(response != null){
          if(encrypt.comparePassword(password, response.password)){
            const user = {
              id: response.id,
              nama_lengkap: response.nama_lengkap,
              nik: response.nik
            }

            const access_token = jwtHelper.signToken(user)
            res.status(201).json({
              statusCode: 201,
              body: {
                access_token,
                user
              }
            })

          }else{
            throw createError(404, { name: 'UserNotFound', message: 'Email atau password salah!' })
          }
        }else{
          throw createError(404, { name: 'UserNotFound', message: 'Pengguna tidak terdaftar!' })
        }
      })
      .catch(next)
  }

  static requestChangePassword(req, res, next){
    const { email } = req.body
    
    User
      .findOne({
        where : {
          email
        }
      })
      .then(response => {
        if(response != null){
          const email_token = jwtHelper.tokenChangePassword({
            email,
            type: 'changePassword'
          })
          res.status(200).json({
            statusCode: 200,
            email_token
          })
        }else{
          throw createError(404, { name: 'UserNotFound', message: 'Email tidak terdaftar!' })
        }
      })
      .catch(next)
  }

  static changePasswordAdmin(req, res, next){
    const { password } = req.body
    const {email} = req.email

    User
      .update({ password },{
        where : {
          email
        },
        individualHooks: true,
        returning: true
      })
      .then(response => {
        req.email = null
        const { id, nama_lengkap, email, nik } = response[1][0]
        const user = { id, nama_lengkap, email, nik }
        res.status(200).json({
          statusCode: 200,
          body: user
        })
      })
      .catch(next)
  }

  static updateAdmin(req, res, next){
    const { nama_lengkap, email, password } = req.body
    const value = { nama_lengkap, email, password }
    const id  = req.params.id

    User
      .update(value, {
        where : {
          id
        },
        returning: true
      })
      .then(response => {
        res.status(200).json({
          statusCode: 200,
          body: response[1][0]
        })
      })
      .catch(next)
  }

  static deleteAdmin(req, res, next){
    const id = req.params.id
    let data = {}

    User
      .findOne({
        where : {
          id
        }
      })
      .then(response => {
        const { id, nama_lengkap, email, nik } = response
        data = { id, nama_lengkap, email, nik }
        return response.destroy()
      })
      .then(response => {
        res.status(200).json({
          statusCode: 200,
          body: data
        })
      })
  }

}

module.exports = UserController