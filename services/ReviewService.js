const { createReview } = require('../models/ReviewDao');

async function writeReview(review, score, user_id, room_id, reservation_id) {
  await createReview(review, score, user_id, room_id, reservation_id);
}

module.exports = { writeReview };
const { readReviewsDao, readMyReviewsDao } = require('../models/ReviewDao');

async function readReviewService(id) {
  const reviews = await readReviewsDao(id);
  return reviews;
}

async function readMyReviewService(id) {
  const myReviews = await readMyReviewsDao(id);
  return myReviews;
}

module.exports = { readReviewService, readMyReviewService };
const { updateReviewDao } = require('../models/ReviewDao');

async function updateReviewService(review, score, id) {
  await updateReviewDao(review, score, id);
}

module.exports = { updateReviewService };
