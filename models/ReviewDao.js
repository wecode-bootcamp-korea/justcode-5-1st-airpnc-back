//const prisma = require('./index');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function updateReviewDao(review, score, id) {
  return prisma.$queryRaw`
  update review set review=${review}, score=${score} where id=${id}`;
}

module.exports = { updateReviewDao };
