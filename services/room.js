const {
  readRoomsForHome,
  readRoomsByFilter,
  readRoomsIdForUserWished,
  readRoomById,
  readRoomsTest,
} = require('../models/room');

const {
  checkRoomExist,
  checkValidRoomExist,
} = require('../middlewares/validateRoom');

async function checkUserHasWished(userId) {
  const roomIds = await readRoomsIdForUserWished(userId);
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
  const rooms = await readRoomsForHome();
  await checkValidRoomExist(rooms);
  return rooms;
}

async function getRoomsByFilter(filters) {
  const rooms = await readRoomsByFilter(filters);
  await checkValidRoomExist(rooms);
  return rooms;
}

async function getRoomsForAllUsers(filters) {
  return Object.keys(filters).length === 0
    ? await getRoomsForMain()
    : await getRoomsByFilter(filters);
}

async function getRoomsForLoggedUser(userId, filters) {
  const wishlist = await checkUserHasWished(userId);
  const rooms = await getRoomsForAllUsers(filters);
  if (!wishlist) {
    return rooms;
  } else {
    return await markWished(wishlist, rooms);
  }
}

async function getRoomById(roomId) {
  await checkRoomExist(roomId);
  return await readRoomById(roomId);
}

////////////////////test code ///////////////////////////////////

async function testRooms(filters) {
  return await readRoomsTest(filters);
}
/////////////////////////////////////////////////////////////////

module.exports = {
  getRoomsForMain,
  getRoomsByFilter,
  getRoomsForAllUsers,
  getRoomsForLoggedUser,
  getRoomById,
  testRooms,
};
