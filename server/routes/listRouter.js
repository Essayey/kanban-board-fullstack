const Router = require('express');
const router = new Router();
const listController = require('../controllers/listController')

router.post('/', listController.create) // Create list
router.delete('/', listController.delete) // Delete list by id

module.exports = router