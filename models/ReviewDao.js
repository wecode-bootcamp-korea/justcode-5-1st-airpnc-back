const prisma = require('./index');

async function readDetail(id) {
  const selectReview = await prisma.$queryRaw`
  SELECT
      users.name,
      review.review,
      review.score,
      review.created_at
    FROM review
    JOIN 
      users on review.user_id = users.id 
    JOIN
      room on review.room_id = room.id
    WHERE
      review.room_id = ${roomId}`;
  return selectReview;
}

module.exports = { readDetail };
