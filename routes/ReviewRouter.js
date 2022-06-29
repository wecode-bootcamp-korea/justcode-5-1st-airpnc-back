const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

const {
  createReview,
  readReviewController,
  readMyReviewController,
  updateReviewController,
  deleteReviewController,
} = require('../controllers/ReviewController');

router.post('/', createReview);
router.get('/:id', readReviewController);
router.get('/my/:id', readMyReviewController);
router.put('/:id', updateReviewController);
router.delete('/:id', asyncWrap(deleteReviewController));

module.exports = router;
