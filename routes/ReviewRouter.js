const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

const {
  createReview,
  readReviewController,
  readMyReviewController,
  deleteReviewController,
  updateReviewController,
} = require('../controllers/ReviewController');

//router.get('/', reviewController.getReview);
//console.log('콘솔!!', createReview);
router.post('/', createReview);
router.get('/:id', readReviewController);
router.get('/my/:id', readMyReviewController);
router.delete('/:id', asyncWrap(deleteReviewController));
router.put('/:id', updateReviewController);

module.exports = router;
