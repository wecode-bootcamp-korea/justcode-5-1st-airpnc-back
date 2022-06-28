//const prisma = require('./index');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createReview(review, score, user_id, room_id, reservation_id) {
  return prisma.$queryRaw`
  Insert Into review(review, score, user_id, room_id, reservation_id) 
  VALUES (${review}, ${score}, ${user_id}, ${room_id}, ${reservation_id})`;
}

module.exports = { createReview };
