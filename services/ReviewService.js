const {
  createReview,
  readReviewsDao,
  readMyReviewsDao,
  deleteReviewDao,
  isValidReview,
  updateReviewDao,
} = require('../models/ReviewDao');

async function writeReview(review, score, user_id, room_id, reservation_id) {
  await createReview(review, score, user_id, room_id, reservation_id);
}

async function readReviewService(id) {
  const reviews = await readReviewsDao(id);
  return reviews;
}

async function readMyReviewService(id) {
  const myReviews = await readMyReviewsDao(id);
  return myReviews;
}

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

async function updateReviewService(review, score, id) {
  await updateReviewDao(review, score, id);
}

module.exports = {
  writeReview,
  readReviewService,
  readMyReviewService,
  deleteReviewService,
  updateReviewService,
};
