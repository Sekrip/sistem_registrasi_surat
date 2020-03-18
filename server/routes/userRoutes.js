const router = require('express').Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authEmailToken = require('../middlewares/authEmailToken');
const isUserExist = require('../middlewares/isUserExist');
const isUserDeleted = require('../middlewares/isUserDeleted');

router.get('/', authentication, UserController.getDataAdmin);
router.post('/login', UserController.loginAdmin)
router.post('/create', authentication, isUserDeleted, UserController.createAdmin)
router.post('/request-change-password', UserController.requestChangePassword)
router.patch('/change-password', authEmailToken ,UserController.changePasswordAdmin)
router.put('/update/:id', authentication, isUserDeleted, isUserExist, UserController.updateAdmin)
router.delete('/delete/:id', authentication, isUserDeleted, isUserExist, UserController.deleteAdmin)


module.exports = router
