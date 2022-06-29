const { Router } = require('express');
//const asyncWrap = require('../async-wrap');
const router = Router();

const {
  createReview,
  readReviewController,
  readMyReviewController,
  updateReviewController,
} = require('../controllers/ReviewController');

router.post('/', createReview);
router.get('/:id', readReviewController);
router.get('/my/:id', readMyReviewController);
router.put('/:id', updateReviewController);

module.exports = router;
