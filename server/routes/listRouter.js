const Router = require('express');
const router = new Router();
const listController = require('../controllers/listController')

router.post('/:boardId',) // Create list
router.get('/:boardId',) // Get all lists, belongs to board
router.delete('/:id',) // Delete list by id

module.exports = router