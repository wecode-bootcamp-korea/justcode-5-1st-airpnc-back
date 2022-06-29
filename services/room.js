const {
  readRoomsForHome,
  readRoomsByFilter,
  readRoomsIdForUserWished,
  readRoomById,
} = require('../models/room');

async function checkUserHasWished(userId) {
  const roomIds = await readRoomsIdForUserWished(userId);
  if (roomIds.length > 0) {
    console.log('some');
  } else {
    console.log('none');
  }
  console.log(roomIds);
  return roomIds.length > 0 ? roomIds : false;
}

async function markWished(wishlist, rooms) {
  let roomIds = wishlist.map(room => room.id);
  rooms.map(room => {
    if (roomIds.includes(room.id)) {
      room.wish = true;
    } else {
      room.wish = false;
    }
  });
  return rooms;
}

async function getRoomsForMain() {
  console.log('in getRoomsForMain');
  console.log('in service: ', await readRoomsForHome());
  return await readRoomsForHome();
}

async function getRoomsByFilter(filters) {
  console.log('in getRoomsByFilter', await readRoomsByFilter(filters));
  return await readRoomsByFilter(filters);
}

async function getRoomsForAllUsers(filters) {
  if (Object.keys(filters).length === 0) {
    console.log('calling getRoomsForMain');
  } else {
    console.log('calling getRoomsByFilter');
  }
  return Object.keys(filters).length === 0
    ? await getRoomsForMain()
    : await getRoomsByFilter(filters);
}

async function getRoomsForLoggedUser(userId, filters) {
  const wishelist = await checkUserHasWished(userId);
  const rooms = await getRoomsForAllUsers(filters);
  if (!wishelist) {
    return rooms;
  } else {
    return await markWished(wishelist, rooms);
  }
}
////////////////////////////////////////////////////////
async function getRoomById(roomId) {
  return await readRoomById, await readRoomById(roomId);
}

async function testRooms(filters) {
  console.log('in test service', await readRoomsTest(filters));
  return await readRoomsTest(filters);
}

module.exports = {
  getRoomsForMain,
  getRoomsByFilter,
  getRoomsForAllUsers,
  getRoomsForLoggedUser,
  getRoomById,
};
