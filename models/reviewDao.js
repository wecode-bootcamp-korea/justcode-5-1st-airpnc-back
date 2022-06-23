const prisma = require('./index');

const getReview = async roomId => {
  const review = await prisma.$queryRaw`
    SELECT
      users.name,
      review.review,
      review.score,
      review.created_at
    FROM review
    JOIN 
      users on review.user_id = users.id 
    JOIN
      rooms on review.room_id = room.id
    WHERE
      review.room_id = ${roomId}
    `;
  return review;
};

function createReview(review, score, user_id, room_id, reservation_id) {
  return prisma.$queryRaw`
  Insert Into review(review, score, user_id, room_id, reservation_id) 
  VALUES (${review}, ${score}, ${user_id}, ${room_id}, ${reservation_id})`;
}

function updateReview() {}

function deleteReview() {}

module.exports = { getReview };
