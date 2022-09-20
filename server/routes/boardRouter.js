const Router = require('express');
const router = new Router();
const boardController = require('../controllers/boardController')

router.post('/', boardController.create) // Create board
router.get('/', boardController.getAll) // Get all boards, belongs to user
router.get('/:id', boardController.getOne) // Get one board by id
router.delete('/', boardController.delete) // Delete board by id

module.exports = router