const { createReview } = require('../models/ReviewDao');

async function deleteReviewService(
  review,
  score,
  user_id,
  room_id,
  reservation_id
) {
  await createReview(review, score, user_id, room_id, reservation_id);
}

module.exports = { deleteReviewService };
