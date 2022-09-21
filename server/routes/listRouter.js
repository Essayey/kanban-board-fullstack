const Router = require('express');
const router = new Router();
const listController = require('../controllers/listController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, listController.create) // Create list
router.delete('/', authMiddleware, listController.delete) // Delete list by id

module.exports = router