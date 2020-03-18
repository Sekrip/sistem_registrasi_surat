const { KartuKeluarga } = require('../models/index');

class KartuKeluargaController {

  static async createKartuKeluarga(req, res, next){
    const { 
      nomor_registrasi,
      bulan_registrasi,
      tahun_registrasi,
      nama_lengkap,
      jenis_kelamin,
      status_kawin,
      agama,
      pendidikan,
      nkk,
      nik,
      nama_ortu,
      alamat,
      keterangan,
    } = req.body
    
    const value = {
      nomor_registrasi,
      bulan_registrasi,
      tahun_registrasi,
      nama_lengkap,
      tanggal: new Date(),
      jenis_kelamin,
      status_kawin,
      agama,
      pendidikan,
      nkk,
      nik,
      nama_ortu,
      alamat,
      keterangan,
      UserId : req.user.id
    }

    try {
      const newData = await KartuKeluarga.create(value)
      res.status(201).json({
        statusCode: 201,
        body: newData
      })
    } catch (error) {
      next(error)
    }
  }

  static async getListKartuKeluarga(req, res, next){
    try {
      const listKartuKeluarga = await KartuKeluarga.findAll()
      res.status(200).json({
        statusCode: 200,
        body: listKartuKeluarga
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateKartuKeluarga(req, res, next){
    const {
      jenis_kelamin,
      status_kawin,
      agama,
      pendidikan,
      nkk,
      nik,
      nama_ortu,
      alamat,
      keterangan,
      nama_lengkap, 
    } = req.body
    
    const value = {
      jenis_kelamin,
      status_kawin,
      agama,
      pendidikan,
      nkk,
      nik,
      nama_ortu,
      alamat,
      keterangan,
      nama_lengkap,
    }    

    try {
      const updatedKartuKeluarga = await KartuKeluarga.update(value, {
        where: {
          id: req.params.id
        },
        returning: true
      })
      res.status(200).json({
        statusCode: 200,
        updatedRow: updatedKartuKeluarga[0],
        body: updatedKartuKeluarga[1][0]
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteKartuKeluarga(req, res, next){
    try {
      const dataKartuKeluarga = await KartuKeluarga.findByPk(req.params.id)
      const deleteKartuKeluarga = await KartuKeluarga.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        statusCode: 200,
        deletedRow: deleteKartuKeluarga,
        body: dataKartuKeluarga
      })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = KartuKeluargaController