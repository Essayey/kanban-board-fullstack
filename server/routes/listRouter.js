const Router = require('express');
const router = new Router();
const listController = require('../controllers/listController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, listController.create) // Create list
router.put('/', authMiddleware, listController.updateTitle) // Update title of the list
router.put('/move', authMiddleware, listController.move) // Move list
router.delete('/:id', authMiddleware, listController.delete) // Delete list by id

module.exports = router