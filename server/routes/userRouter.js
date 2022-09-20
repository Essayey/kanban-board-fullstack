const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/check', userController.check)

module.exports = router