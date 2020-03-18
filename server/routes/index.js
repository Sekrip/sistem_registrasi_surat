const router = require('express').Router();
const userRoutes = require('./userRoutes');
const kkRoutes = require('./kartuKeluargaRoutes');

router.use('/users', userRoutes);
router.use('/kartu-keluarga', kkRoutes);

module.exports = router;
