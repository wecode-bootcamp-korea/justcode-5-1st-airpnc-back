const { Router } = require('express');
//const asyncWrap = require('../async-wrap');
const router = Router();

const { updateReviewController } = require('../controllers/ReviewController');

//router.get('/', reviewController.getReview);
//console.log('콘솔!!', createReview);
//router.post('/', createReview);
router.put('/:id', updateReviewController);

module.exports = router;
