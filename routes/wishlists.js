const router = require('express').Router();

const {
  getWishlists, createWishlist, removeWishlist
} = require('../controllers/wishlists');


router.get('/', getWishlists);
router.post('/', createWishlist);
router.post('/:wishlistId', addWishToWishlist);
router.delete('/:wishlistId', removeWishlist);

module.exports = router;
