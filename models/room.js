const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getRooms() {
  //  const rooms = await prisma.$queryRaw`
  //    SELECT * FROM room
  //  `;
  //  console.log(`rooms : ${rooms}`);
  return rooms;
}

async function getRoomById(id) {
  // const room = await prisma.$queryRaw`
  //   SELECT id FROM room WHERE id=${id}
  // `;
  // return room;
}

async function getRoomsByModel() {
  console.log('in getRoomsByModel');
  const rooms = await prisma.room.findMany();

  console.log(`roombymodel ${rooms}`);
  return rooms;
}

async function getCities() {
  console.log('in getCities');
  const cities = await prisma.city.findMany();

  console.log(`getCities ${cities}`);
  return cities;
}

// async function getRoomsByItems(items) {
//   const {
//     price,
//     address,
//     guests,
//     beds,
//     bedrooms,
//     baths,
//     instant_book,
//     residential_type,
//     room_type,
//     location_type,
//   } = items;
//   console.log(`requested : ${price}`);
//   const room = await prisma.room.findMany({
//     where: {
//       price: {
//         gt: {price},
//         lte: {price},
//       },
//       address: {

//       },
//       guests: {
//         some: {
//           gt: {bedroom},
//         }
//       },
//       beds: {
//         some: {
//           gt: {bedroom},
//         }
//       },
//       bedrooms: {
//         some: {
//           gt: {bedroom},
//         }
//       },
//       baths: {
//         some: {
//           gt: {bedroom},
//         }
//       },
//       instant_book: {

//       },
//       residential_type: {

//       },
//       room_type: {

//       },
//       location_type: {

//       },
//     }
//   });
//   console.log(`roombyid ${room}`);
//   return room;
// }

//async function getlocationType() {}
// async function getRoomsByInput(filterOptions) {
//   const filerList = filterOptions.filter(option => {
//     option.length > 0;
//   });
// }

module.exports = { getRooms, getRoomById, getRoomsByModel, getCities };
