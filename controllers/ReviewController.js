//const { reviewService } = require('../services');

const { updateReviewService } = require('../services/ReviewService');

const updateReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    const { review, score } = req.body;
    await updateReviewService(review, score, id);

    return res.status(201).json({ message: 'UPDATED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { updateReviewController };
