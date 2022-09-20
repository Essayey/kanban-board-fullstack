const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter')
const boardRouter = require('./boardRouter')
const listRouter = require('./listRouter')
const cardRouter = require('./cardRouter')

router.use('/user', userRouter)
router.use('/board', boardRouter)
router.use('/list', listRouter)
router.use('/card', cardRouter)

module.exports = router