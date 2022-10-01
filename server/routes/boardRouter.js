const Router = require('express');
const router = new Router();
const boardController = require('../controllers/boardController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, boardController.create) // Create board
router.get('/', authMiddleware, boardController.getAll) // Get all boards, belongs to user
router.get('/:id', authMiddleware, boardController.getOne) // Get one board by id
router.put('/background', authMiddleware, boardController.updateBackground) // Update background
router.put('/name', authMiddleware, boardController.updateName) // Update name
router.delete('/:id', authMiddleware, boardController.delete) // Delete board by id

module.exports = router