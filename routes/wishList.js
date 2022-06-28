const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();
const wishList = require('../controllers/wishlist');
// router.get('/list', async (req, res) => {
//   console.log('list');
// });
console.log;
router.get('/wishlist', asyncWrap(wishList));
module.exports = router;
