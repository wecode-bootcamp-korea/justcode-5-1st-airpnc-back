//const { reviewService } = require('../services');

const { isExistReview, readReview } = require('../services/ReviewService');

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

const readReviews = async (req, res) => {
  try {
    let { id } = req.params;
    //await isExistReview(id);
    const reviews = await readReview(id);
    return res.status(201).json({ data: reviews });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { readReviews };
