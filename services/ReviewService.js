const { deleteReviewDao } = require('../models/ReviewDao');

async function deleteReviewService(id) {
  try {
    console.log('serveice id : ', id);
    await deleteReviewDao(id);
  } catch (err) {
    const error = new Error('DELETING FAILED');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { deleteReviewService };
