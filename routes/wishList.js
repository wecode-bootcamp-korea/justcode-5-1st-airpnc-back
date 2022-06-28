const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();
const {
  wishList,
  deletwishList,
  insertwishList,
} = require('../controllers/wishlist');

router.get('/wishlist/:id', wishList);
router.delete('/wishlist/:id', deletwishList);
router.post('/wishlist', insertwishList);
module.exports = router;
