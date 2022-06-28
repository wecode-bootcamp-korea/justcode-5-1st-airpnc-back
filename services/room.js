const {
  readRoomsForHome,
  readRoomsByFilter,
  readRoomById,
} = require('../models/room');

async function getRoomsForMain() {
  console.log('in getRoomsForMain');
  console.log('in service: ', await readRoomsForHome());
  return await readRoomsForHome();
}

async function getRoomsByFilter(filters) {
  console.log('in getRoomsByFilter', await readRoomsByFilter(filters));
  return await readRoomsByFilter(filters);
}

async function getRoomById(id) {
  return await readRoomById, await readRoomById(id);
}

async function testRooms(filters) {
  console.log('in test service', await readRoomsTest(filters));
  return await readRoomsTest(filters);
}

module.exports = { getRoomsForMain, getRoomsByFilter, getRoomById };
