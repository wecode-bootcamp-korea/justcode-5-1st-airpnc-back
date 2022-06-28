const { Router } = require('express');
//const asyncWrap = require('../async-wrap');
const router = Router();

const { readReviews } = require('../controllers/ReviewController');

//router.get('/', reviewController.getReview);
//console.log('콘솔!!', createReview);
//router.post('/', createReview);
router.put('/:id', readReviews);

module.exports = router;
