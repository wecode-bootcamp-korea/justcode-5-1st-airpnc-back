const { deleteReviewDao, isValidReview } = require('../models/ReviewDao');

// checkReviewExist can be moved into middleware dir
async function checkReviewExist(id) {
  const isExist = await isValidReview(id);
  if (isExist.length === 0) {
    const error = new Error('DELETING FAILED');
    error.statusCode = 400;
    throw error;
  }
}

async function deleteReviewService(id) {
  await checkReviewExist(id);
  await deleteReviewDao(id);
}

module.exports = { deleteReviewService };
