const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createReviewDao(review, score, user_id, room_id, reservation_id) {
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

/*
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
} */

// readMyReviewsDao - 사진까지 뽑아오도록 수정
async function readMyReviewsDao(id) {
  const [selectedMyReview, photos] = await prisma.$transaction([
    prisma.$queryRaw`
    SELECT review.id, review.score, review.review, review.created_at, review.room_id, review.created_at, room.name, city.name AS city, city.country, room.name
    from review 
    JOIN room ON review.room_id = room.id 
    JOIN room_city ON review.room_id = room_city.room_id 
    JOIN city ON room_city.city_id=city.id 
    WHERE review.user_id = ${id};`,
    prisma.$queryRaw`
    SELECT room.id as room_id, 
    JSON_ARRAYAGG(CASE WHEN photo.file_url IS NOT NULL THEN JSON_OBJECT('url',photo.file_url) END) AS photo_url 
    FROM photo 
    JOIN room ON photo.room_id = room.id 
    JOIN reservation ON room.id = reservation.room_id 
    where reservation.user_id = ${id} 
    GROUP BY room.id;`,
  ]);
  return [selectedMyReview, photos];
}

async function isValidReview(id) {
  return await prisma.$queryRaw`
	SELECT id FROM review WHERE id = ${id}`;
}

async function deleteReviewDao(id) {
  await prisma.$queryRaw`
  DELETE FROM review WHERE id=${id}`;
}

async function updateReviewDao(review, score, id) {
  //console.log(review, score, id, 333);
  await prisma.$queryRaw`
  update review set review=${review}, score=${score} 
  where id=${id}`;
}

module.exports = {
  createReviewDao,
  readReviewsDao,
  readMyReviewsDao,
  deleteReviewDao,
  isValidReview,
  updateReviewDao,
};
