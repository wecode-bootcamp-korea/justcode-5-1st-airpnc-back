const { updateReviewDao } = require('../models/ReviewDao');

async function updateReviewService(review, score, id) {
  await updateReviewDao(review, score, id);
}

module.exports = { updateReviewService };
