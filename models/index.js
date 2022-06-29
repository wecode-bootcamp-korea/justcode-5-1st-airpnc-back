<<<<<<< HEAD
//const { Prisma, PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient();

//module.exports = prisma;

// const reviewDao = require('./ReviewDao');

// module.exports = {
//   reviewDao,
// };
=======
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;

const reviewDao = require('./ReviewDao');

module.exports = {
  reviewDao,
};
>>>>>>> getReview/ji
