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

module.exports = { getReview };
