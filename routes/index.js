const router = require('express').Router();

const userRouter = require('./users');
const wishlistRouter = require('./wishlists');

router.use('/users', userRouter);
router.use('/wishlists', wishlistRouter);

module.exports = router;
