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
    users.id as user_id,
    users.name,
    review.score,
    room.name,
    room.id as room_id,
    review.id as review_id,
    review.review,
    review.created_at,
    city.country,
    city.name as city
    FROM review
  JOIN 
    users on review.user_id = users.id 
  JOIN
    room on review.room_id = room.id
  JOIN
    room_city on room.id = room_city.room_id
  JOIN 
    city on room_city.city_id = city.id
  WHERE
    users.id = ${id}`;

  return selectedMyReview;
}

async function isValidReview(id) {
  return await prisma.$queryRaw`
	SELECT id FROM review WHERE id = ${id}
`;
}

async function deleteReviewDao(id) {
  await prisma.$queryRaw`
  DELETE FROM review WHERE id=${id}`;
}

async function updateReviewDao(review, score, id) {
  console.log(review, score, id, 333);
  await prisma.$queryRaw`
  update review set review=${review}, score=${score} where id=${id}`;
}

module.exports = {
  createReview,
  readReviewsDao,
  readMyReviewsDao,
  deleteReviewDao,
  isValidReview,
  updateReviewDao,
};
