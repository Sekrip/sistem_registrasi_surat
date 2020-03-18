const { KartuKeluarga } = require('../models/index');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  try {
    const isExist = await KartuKeluarga.findByPk(req.params.id)
    if(isExist != null){
      next()
    }else{
      throw createError(404, { name: 'KartuKeluargaNotFound', message: 'Data Kartu Keluarga Tidak Ditemukan!' })
    }
  } catch (error) {
    next(error)
  }
}