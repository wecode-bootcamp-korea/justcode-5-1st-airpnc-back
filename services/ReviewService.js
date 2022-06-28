//const { reviewDao } = require('../models');
const { readDetail } = require('../models/ReviewDao');

// async function isExistReview(id) {
//   const findReview = await find(id);
//   if (findReview.length === 0) {
//     const error = new Error('REVIEW-NOT-FOUND');
//     error.statusCode = 404;
//     throw error;
//   }
// }

async function readReview(id) {
  const reviews = await readReview(id);
  return reviews;
}

module.exports = { readReview };
