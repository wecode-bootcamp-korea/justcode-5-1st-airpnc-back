//const prisma = require('./index');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function isValidReview(id) {
  return await prisma.$queryRaw`
	SELECT id FROM review WHERE id = ${id}
`;
}

async function deleteReviewDao(id) {
  await prisma.$queryRaw`
  DELETE FROM review WHERE id=${id}`;
}

module.exports = { deleteReviewDao, isValidReview };
