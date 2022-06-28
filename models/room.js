const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getRooms() {
  await prisma.$queryRaw`
    SELECT * FROM room
  `;
}
// async function getRoomsByInput(filterOptions) {
//   const filerList = filterOptions.filter(option => {
//     option.length > 0;
//   });
// }
