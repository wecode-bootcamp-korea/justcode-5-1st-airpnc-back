const { reviewDao } = require('../models');

const getReview = async roomId => {
  const reviewInfo = {};

  const roomReview = await reviewDao.getReview(roomId);

  if (!roomReview) {
    const error = new Error('REVIEW_LOAD_FAILED');
    error.statusCode = 400;
    throw error;
  }

  reviewInfo['roomReview'] = roomReview;

  return reviewInfo;
};

module.exports = { getReview };
