const { deleteReviewDao } = require('../models/ReviewDao');

async function deleteReviewService(id) {
  console.log('serveice id : ', id);
  await deleteReviewDao(id);
}

module.exports = { deleteReviewService };
