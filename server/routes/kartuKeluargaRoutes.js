const router = require('express').Router()
const KartuKeluarga = require('../controllers/kartuKeluargaController');
const authentication = require('../middlewares/authentication');
const kartuKeluargaAuth = require('../middlewares/kartuKeluargaAuth');

router.use(authentication);
router.get('/', KartuKeluarga.getListKartuKeluarga);
router.post('/', KartuKeluarga.createKartuKeluarga);
router.put('/:id', kartuKeluargaAuth ,KartuKeluarga.updateKartuKeluarga);
router.delete('/:id', kartuKeluargaAuth ,KartuKeluarga.deleteKartuKeluarga);

module.exports = router