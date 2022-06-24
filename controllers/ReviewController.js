const { reviewService } = require('../services');

const getReview = async (req, res) => {
  try {
    const { roomId } = req.query;

    if (!roomId) {
      const err = new Error('ROOM_ID_REQUIRED');
      err.statusCode = 400;
      throw err;
    }
  } catch (err) {
    console.log(err);
    return res
      .status(err.statusCode || 500)
      .json(err.message || { message: 'GET_REVIEW_FAILED' });
  }
};

module.exports = { getReview };
