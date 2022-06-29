const { readReviewsDao, readMyReviewsDao } = require('../models/ReviewDao');

// async function isExistReview(id) {
//   const findReview = await find(id);
//   if (findReview.length === 0) {
//     const error = new Error('REVIEW-NOT-FOUND');
//     error.statusCode = 404;
//     throw error;
//   }
// }

async function readReviewService(id) {
  const reviews = await readReviewsDao(id);
  return reviews;
}

/*
async function readReview(id) {
  await readDetail(id);
}*/

async function readMyReviewService(id) {
  const myReviews = await readMyReviewsDao(id);
  return myReviews;
}

module.exports = { readReviewService, readMyReviewService };
