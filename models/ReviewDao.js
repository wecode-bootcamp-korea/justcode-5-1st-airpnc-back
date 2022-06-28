//const prisma = require('./index');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function deleteReviewDao(id) {
  return prisma.$queryRaw`
  DELETE FROM review WHERE id=${id}`;
}

module.exports = { deleteReviewDao };
