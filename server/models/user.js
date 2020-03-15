'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Format email yang dimasukan salah!'
        },
        isUniqueEmail(value){
          return User.findOne({
            where: {
              email: value
            }
          })
          .then(response => {
            if(response != null && this.createdAt){
              throw new Error('Email Telah Terpakai!')
            }
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        minLength(value){
          if(value.length < 6){
            throw new Error('Password minimal 6 karakter!')
          }
        }
      }
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Nama lengkap wajib diisi!'
        }
      }
    },
    nik: {
      type: DataTypes.STRING,
      validate: {
        validasiNik(value){
          if(value.length !== 16){
            throw new Error('NIK harus 16 karakter!')
          }
        }
      }
    }
  }, { hooks: {
    beforeCreate: (instance, options) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(instance.password, salt);
      instance.password = hash
    },
    beforeUpdate: (instance, options) => {
      if(instance.password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    }
  },
  sequelize })

  User.associate = function(models) {
    User.hasMany(models.KartuKeluarga)
  };
  return User;
};