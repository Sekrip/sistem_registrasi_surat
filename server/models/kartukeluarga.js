'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class KartuKeluarga extends Model {}
  KartuKeluarga.init({
    nomor_registrasi: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Nomor registrasi harus angka!'
        },
        notEmpty: {
          msg: 'Nomor registrasi wajib diisi!'
        }
      }
    },
    bulan_registrasi: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Bulan registrasi wajib diisi!'
        }
      }
    },
    tahun_registrasi: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Format tahun salah!'
        },
        notEmpty: {
          msg: 'Tahun registrasi wajib diisi!'
        }
      }
    },
    tanggal: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Tanggal wajib diisi!'
        }
      }
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Jenis kelamin wajib diisi'
        },
        isIn: {
          args: [['Laki-Laki', 'Perempuan']],
          msg: 'Jenis kelamin hanya ada laki-laki dan wanita!'
        }
      }
    },
    status_kawin: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Status kawin wajib diisi!'
        }
      }
    },
    agama: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Agama wajib diisi!'
        }
      }
    },
    pendidikan: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Pendidikan wajib diisi!'
        }
      }
    },
    nkk: {
      type: DataTypes.STRING,
      validate: {
        validasiNkk(value){
          if(value.length !== 16){
            throw new Error('NKK harus 16 karakter!')
          }
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
    },
    nama_ortu: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Nama orangtua wajib diisi!'
        }
      }
    },
    alamat: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Alamat wajib diisi!'
        }
      }
    },
    keterangan: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Keterangan wajib diisi'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate:{
        msg: 'ID penginput harus ada!'
      }
    }
  }, { sequelize })

  KartuKeluarga.associate = function(models) {
    KartuKeluarga.belongsTo(models.User)
  };
  return KartuKeluarga;
};