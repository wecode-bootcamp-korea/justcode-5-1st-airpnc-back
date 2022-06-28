//const { reviewService } = require('../services');

const { isExistReview, readReview } = require('../services/ReviewService');

const readReviews = async (req, res, next) => {
  try {
    const id = req.params.id;
    await isExistReview(id);
    const reviews = await readReview(id);
    return res.status(201).json({ data: postingDetail });
  } catch (err) {
    next(err);
  }
};

module.exports = { readReviews };
