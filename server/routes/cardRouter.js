const Router = require('express');
const router = new Router();
const cardController = require('../controllers/cardController')

router.post('/', cardController.create) // Create card
router.get('/:id', cardController.getOne) // Get card by id
router.put('/', cardController.update) // Update card by id
router.delete('/', cardController.delete) // Delete card by id

module.exports = router