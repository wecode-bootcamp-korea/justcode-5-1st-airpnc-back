const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const isFilterValid = option => {
  return option !== null ? option : undefined;
};

const addressCheck = () => {};

async function readRoomsForHome() {
  const rooms = await prisma.room.findMany({
    include: {
      users: {
        select: {
          id: true,
          name: true,
          profile_image: true,
        },
      },
      photo: {
        select: {
          file_url: true,
        },
      },
      roomType: {
        select: {
          name: true,
        },
      },
      locationType: {
        select: {
          name: true,
        },
      },
    },
  });
  return rooms;
}

async function readRoomsByFilter(filters) {
  const {
    price,
    country,
    city,
    guests,
    beds,
    bedrooms,
    baths,
    instant_book,
    residential_type,
    room_type,
    location_type,
  } = filters;
  //console.log(`price : ${price}`);
  const room = await prisma.room.findMany({
    where: {
      price: {
        gt: isFilterValid(price)
          ? price.min !== null
            ? price.min
            : undefined
          : undefined,
        lte: isFilterValid(price)
          ? price.max !== null
            ? price.max
            : undefined
          : undefined,
      },
      address: {
        contains: isFilterValid(country),
      },
      guests: {
        gte: isFilterValid(guests),
      },
      beds: {
        gte: isFilterValid(beds),
      },
      bedrooms: {
        gte: isFilterValid(bedrooms),
      },
      baths: {
        gte: isFilterValid(baths),
      },
      residential_type: isFilterValid(residential_type),
      room_type: isFilterValid(room_type),
      location_type: isFilterValid(location_type),
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          profile_image: true,
        },
      },
      photo: {
        select: {
          file_url: true,
        },
      },
      roomType: {
        select: {
          name: true,
        },
      },
      locationType: {
        select: {
          name: true,
        },
      },
    },
  });
  return room;
}

async function readRoomById(id) {
  console.log('readRoomById : ', id);
  console.log('id : ', id);
  //const room = await prisma.$queryRaw`
  // SELECT * FROM room
  // JOIN users ON users.id = host_id
  // WHERE room.id=${id}
  // `;
  const room = await prisma.room.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          profile_image: true,
        },
      },
      photo: {
        select: {
          file_url: true,
        },
      },
      roomType: {
        select: {
          name: true,
        },
      },
      locationType: {
        select: {
          name: true,
        },
      },
    },
  });
  return room;
}

async function readRoomsIdForUserWished(userId) {
  console.log('in model readRoomByUserWish');
  const rooms = await prisma.$queryRaw`
    SELECT room.id
    FROM wishlist 
    JOIN users ON users.id = wishlist.user_id
    JOIN room ON room.id = wishlist.room_id
    WHERE users.id=${userId}
  `;
  console.log('room : ', rooms);
  return rooms;
}

// async function readRoomsByUserWishlist(userId) {
//   console.log('in model readRoomByUserWish');
//   console.log(rooms);
//   return rooms;
// }

//////////////////////////////////////////////////////
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

async function getRoomsByCity(city) {
  console.log('in getRoomByCountries');
  const rooms = await prisma.$queryRaw`
    SELECT * FROM room
    JOIN room_city ON room_city.room_id = room.id
    JOIN city ON city.id = room_city.city_id
    where city.name=${city}         
  `;
  return rooms;
}

async function getRoomByTest(items) {
  //console.log(`in getRoomByTest`);
  //console.log(`items : ${items}`);
  const { price, baths, bedrooms, guests } = items;
  //console.log(`price : ${price}`);
  // const rooms = await prisma.room.findMany({
  //   where: {
  //     price: {
  //       gte: isFilterValid(price),
  //     },
  //     baths: {
  //       gte: isFilterValid(baths),
  //     },
  //     bedrooms: {
  //       gte: isFilterValid(bedrooms),
  //     },
  //     guests: {
  //       gte: isFilterValid(guests),
  //     },
  //   },
  // });
  const rooms = await prisma.room.findMany({
    include: {
      users: {
        select: {
          name: true,
        },
      },
      photo: {
        select: {
          file_url: true,
        },
      },
      roomType: {
        select: {
          name: true,
        },
      },
      locationType: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(`getRoomsByFilter ${rooms}`);
  return rooms;
}

module.exports = {
  readRoomsForHome,
  readRoomsByFilter,
  readRoomById,
  readRoomsIdForUserWished,
  getRoomsByModel,
  getCities,
  getRoomByTest,
};
