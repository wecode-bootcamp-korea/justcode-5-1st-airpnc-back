const { Router } = require('express');
//const asyncWrap = require('../async-wrap');
const router = Router();

//const { createReview } = require('../controllers/ReviewController');
const { deleteReviewController } = require('../controllers/ReviewController');

//console.log('콘솔!!', deleteReviewController);
router.delete('/:id', deleteReviewController);

module.exports = router;
