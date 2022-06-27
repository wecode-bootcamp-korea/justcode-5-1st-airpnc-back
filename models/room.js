const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getRooms() {
  const [rooms] = await prisma.$queryRaw`
    SELECT room.id FROM room
  `;
  return rooms;
}

async function getRoomById(id) {
  const [room] = await prisma.$queryRaw`
    SELECT id FROM room WHERE id=${id}
  `;
  console.log(`roombyid ${room}`);
  return room;
}

// async function getRoomsByInput(filterOptions) {
//   const filerList = filterOptions.filter(option => {
//     option.length > 0;
//   });
// }

module.exports = { getRooms, getRoomById };
