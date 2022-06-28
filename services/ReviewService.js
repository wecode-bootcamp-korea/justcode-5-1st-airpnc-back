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
  const reviews = await readDetail(id);
  return reviews;
}

/*
async function readReview(id) {
  await readDetail(id);
}*/

module.exports = { readReview };
