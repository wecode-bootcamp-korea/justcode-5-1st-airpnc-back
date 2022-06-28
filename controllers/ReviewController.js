const { writeReview } = require('../services/ReviewService');

const createReview = async (req, res) => {
  try {
    const { review, score, user_id, room_id, reservation_id } = req.body;
    await writeReview(review, score, user_id, room_id, reservation_id);

    return res.status(201).json({ message: 'CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createReview };
