const { reviewService } = require('../services');

const getReview = async (req, res) => {
  try {
    const { roomId } = req.query;

    if (!roomId) {
      const err = new Error('ROOM_ID_REQUIRED');
      err.statusCode = 400;
      throw err;
    }

    const reviewInfo = await reviewService.getReview(roomId);

    if (reviewInfo === []) {
      const err = new Error('REVIEW_NOT_FOUND');
      err.statusCode = 404;
      throw err;
    }

    return res.status(200).json({ message: 'REVIEW', reviewInfo });
  } catch (err) {
    console.log(err);
    return res
      .status(err.statusCode || 500)
      .json(err.message || { message: 'GET_REVIEW_FAILED' });
  }
};

module.exports = { getReview };
