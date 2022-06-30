const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const isFilterValid = option => {
  return option !== null && option !== 0 ? option : undefined;
};

// TO DO : if address contains either city or country
const addressCheck = () => {};

async function readRoomsForHome() {
  const rooms = await prisma.room.findMany({
    include: {
      users: {
        select: {
          id: true,
          name: true,
          profile_image: true,
          created_at: true,
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
  const room = await prisma.room.findMany({
    where: {
      price: {
        gt: isFilterValid(price)
          ? price.min !== null
            ? price.min
            : undefined
          : undefined,
        lte: isFilterValid(price)
          ? price.max !== null && price.max !== 0
            ? price.max
            : undefined
          : undefined,
      },
      address: {
        contains: isFilterValid(city),
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
      room_type: {
        equals: isFilterValid(room_type)
          ? room_type !== 0
            ? room_type
            : undefined
          : undefined,
      },
      residential_type: {
        equals: isFilterValid(residential_type)
          ? residential_type !== 0
            ? residential_type
            : undefined
          : undefined,
      },
      location_type: {
        equals: isFilterValid(location_type)
          ? location_type !== 0
            ? location_type
            : undefined
          : undefined,
      },
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          profile_image: true,
          created_at: true,
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
          created_at: true,
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
  const rooms = await prisma.$queryRaw`
    SELECT room.id
    FROM wishlist 
    JOIN users ON users.id = wishlist.user_id
    JOIN room ON room.id = wishlist.room_id
    WHERE users.id=${userId}
  `;
  return rooms;
}

// async function readRoomsByUserWishlist(userId) {
//   console.log('in model readRoomByUserWish');
//   console.log(rooms);
//   return rooms;
// }

////////////////////////// TEST CODE ////////////////////////////
async function getRoomsByModel() {
  const rooms = await prisma.room.findMany();
  return rooms;
}

async function getCities() {
  const cities = await prisma.city.findMany();
  return cities;
}

async function getRoomsByCity(city) {
  const rooms = await prisma.$queryRaw`
    SELECT * FROM room
    JOIN room_city ON room_city.room_id = room.id
    JOIN city ON city.id = room_city.city_id
    where city.name=${city}         
  `;
  return rooms;
}

async function readRoomsTest(filters) {
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
  console.log(`in readRoomByTest`);
  console.log(`filters : ${filters}`);
  //const { price, baths, bedrooms, guests } = items;
  //console.log(`price : ${price}`);
  const rooms = await prisma.room.findMany({
    where: {
      price: {
        gte: isFilterValid(price),
      },
      baths: {
        gte: isFilterValid(baths),
      },
      bedrooms: {
        gte: isFilterValid(bedrooms),
      },
      guests: {
        gte: isFilterValid(guests),
      },
    },
  });
  console.log(`readRoomByTest Room ${rooms}`);
  return rooms;
}

/////////////////////////////////////////////////////

module.exports = {
  readRoomsForHome,
  readRoomsByFilter,
  readRoomById,
  readRoomsIdForUserWished,
  getRoomsByModel,
  getCities,
  readRoomsTest,
};
