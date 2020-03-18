'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('KartuKeluargas', 'nama_lengkap', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('KatuKeluargas', 'nama_lengkap', {});
  }
};
