const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function createReview(review, score, user_id, room_id, reservation_id) {
  return prisma.$queryRaw`
  Insert Into review(review, score, user_id, room_id, reservation_id) 
  VALUES (${review}, ${score}, ${user_id}, ${room_id}, ${reservation_id})`;
}

//function readReview() {}

async function readReviews() {
  return prisma.$queryRaw`
  SELECT 
    review.review,
    review.score,
    users.name,
    users.profile_image 
  FROM users
  JOIN review ON review.user_id = users.id`;
}

function updateReview() {}

function deleteReview() {}
