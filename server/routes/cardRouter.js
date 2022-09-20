const Router = require('express');
const router = new Router();
const cardController = require('../controllers/cardController')

router.post('/:listId', cardController.create) // Create card
router.get('/:id', cardController.getOne) // Get card by id
router.put('/:id', cardController.update) // Update card by id
router.delete('/:id', cardController.delete) // Delete card by id

module.exports = router