//const { Router } = require('express');
//const asyncWrap = require('../async-wrap');
//const router = Router();

const express = require('express');
const router = express.Router();

const { readReviews } = require('../controllers/ReviewController');
router.use(express.json());

const { reviewController } = require('../controllers');

router.get('/:id', readReviews);

module.exports = router;
