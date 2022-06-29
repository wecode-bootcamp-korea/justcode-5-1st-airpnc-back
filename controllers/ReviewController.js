//const { reviewService } = require('../services');

const {
  isExistReview,
  readReviewService,
  readMyReviewService,
} = require('../services/ReviewService');

/*
const readReviews = async (req, res, next) => {
  try {
    let { id } = req.params;
    //await isExistReview(id);
    const reviews = await readReview(id);
    return res.status(201).json({ data: reviews });
  } catch (err) {
    next(err);
  }
};*/

const readReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    //await isExistReview(id);
    const reviews = await readReviewService(id);
    return res.status(201).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const readMyReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    //await isExistReview(id);
    const myReviews = await readMyReviewService(id);
    return res.status(201).json(myReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { readReviewController, readMyReviewController };
