'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KartuKeluargas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor_registrasi: {
        type: Sequelize.INTEGER
      },
      bulan_registrasi: {
        type: Sequelize.STRING
      },
      tahun_registrasi: {
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATE
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      status_kawin: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      pendidikan: {
        type: Sequelize.STRING
      },
      nkk: {
        type: Sequelize.STRING
      },
      nik: {
        type: Sequelize.STRING
      },
      nama_ortu: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('KartuKeluargas');
  }
};