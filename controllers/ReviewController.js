const { deleteReviewService } = require('../services/ReviewService');

const deleteReview = async (req, res) => {
  try {
    let { id } = req.params;
    await deleteReviewService(review, score, user_id, room_id, reservation_id);

    return res.status(201).json({ message: 'CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createReview, deleteReview };
