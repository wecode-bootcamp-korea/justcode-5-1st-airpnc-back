const { createReview } = require('../models/ReviewDao');

async function writeReview(review, score, user_id, room_id, reservation_id) {
  await createReview(review, score, user_id, room_id, reservation_id);
}

module.exports = { writeReview };
