const Router = require('express');
const router = new Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, cardController.create) // Create card
router.get('/:id', authMiddleware, cardController.getOne) // Get card by id
router.put('/', authMiddleware, cardController.update) // Update card by id
router.delete('/', authMiddleware, cardController.delete) // Delete card by id

module.exports = router