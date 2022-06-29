const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createReview(review, score, user_id, room_id, reservation_id) {
  return prisma.$queryRaw`
  Insert Into review(review, score, user_id, room_id, reservation_id) 
  VALUES (${review}, ${score}, ${user_id}, ${room_id}, ${reservation_id})`;
}

async function readReviewsDao(id) {
  const selectReview = await prisma.$queryRaw`
  SELECT
      users.name,
      users.profile_image,
      review.review,
      review.score,
      review.created_at
    FROM review
    JOIN 
      users on review.user_id = users.id 
    JOIN
      room on review.room_id = room.id
    WHERE
      review.room_id = ${id}`;
  return selectReview;
}

async function readMyReviewsDao(id) {
  const selectedMyReview = await prisma.$queryRaw`
  SELECT
	  ANY_VALUE(users.id) AS userId,
      ANY_VALUE(users.name) AS userName,
      ANY_VALUE(review.score) AS reviewScore,
      room.name,
      room.id as room_id,
      ANY_VALUE(review.review) AS review,
      ANY_VALUE(review.created_at) AS created_at,
      JSON_ARRAYAGG(CASE WHEN photo.file_url IS NOT NULL THEN JSON_OBJECT('url',photo.file_url) END) AS photo_url
    FROM review
    JOIN 
      users on review.user_id = users.id 
	JOIN
      room on review.room_id = room.id
	JOIN
      photo on room.id = photo.room_id
    WHERE
      users.id = ${id}
	GROUP BY room.id;`;
  return selectedMyReview;
}

function updateReviewDao(review, score, id) {
  return prisma.$queryRaw`
  update review set review=${review}, score=${score} where id=${id}`;
}

module.exports = {
  createReview,
  readReviewsDao,
  readMyReviewsDao,
  updateReviewDao,
};
