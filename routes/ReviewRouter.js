const { Router } = require('express');
//const asyncWrap = require('../async-wrap');
const router = Router();

const { createReview } = require('../controllers/ReviewController');

//router.get('/', reviewController.getReview);
//console.log('콘솔!!', createReview);
router.post('/', createReview);
const {
  readReviewController,
  readMyReviewController,
} = require('../controllers/ReviewController');

//router.get('/', reviewController.getReview);
//console.log('콘솔!!', createReview);
//router.post('/', createReview);
router.get('/:id', readReviewController);
router.get('/my/:id', readMyReviewController);

module.exports = router;
