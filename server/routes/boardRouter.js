const Router = require('express');
const router = new Router();

router.post('/',) // Create board
router.get('/:userId',) // Get all boards, belongs to user
router.get('/:id',) // Get one board by id
router.delete('/:id',) // Delete board by id

module.exports = router