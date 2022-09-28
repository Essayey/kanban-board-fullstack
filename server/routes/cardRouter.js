const Router = require('express');
const router = new Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, cardController.create) // Create card
router.get('/:id', authMiddleware, cardController.getOne) // Get card by id
router.put('/title', authMiddleware, cardController.updateTitle) // Update card by id
router.put('/description', authMiddleware, cardController.updateDescription) // Update card by id
router.delete('/:id', authMiddleware, cardController.delete) // Delete card by id

module.exports = router