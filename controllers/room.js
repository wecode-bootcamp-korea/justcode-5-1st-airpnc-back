const { readRoomsTest } = require('../models/room');

const {
  getRoomsForMain,
  getRoomsByFilter,
  getRoomsForAllUsers,
  getRoomsForLoggedUser,
  getRoomById,
} = require('../services/room');

const roomForHomeControllerDefault = async (req, res) => {
  const rooms = await getRoomsForMain();
  return res.status(200).json(rooms);
};

const roomByFilterController = async (req, res) => {
  const filters = req.body;
  const rooms = await getRoomsByFilter(filters);
  return res.status(200).json(rooms);
};

const roomsForHomeController = async (req, res) => {
  const filters = req.body;
  const rooms = await getRoomsForAllUsers(filters);
  return res.status(200).json(rooms);
};

const homeForLoggedUsersController = async (req, res) => {
  const [userId] = req.params.id;
  const filters = req.body;
  const rooms = await getRoomsForLoggedUser(userId, filters);
  return res.status(200).json(rooms);
};

const readRoomByIdController = async (req, res) => {
  const [roomId] = req.params.id;
  const room = await getRoomById(roomId);
  return res.status(200).json(room);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const readRoomTestController = async (req, res) => {
  const items = req.body;
  const rooms = await readRoomsTest(items);
  console.log(`in readRoom : ${rooms}`);
  return res.status(200).json(rooms);
};

// const readRoomsByModelController = async (req, res) => {
//   console.log(`hi2`);
//   const rooms = await getRoomsByModel();
//   console.log(`in read Room: ${rooms}`);
//   if (!rooms) {
//     const error = new Error(errMsg.invalidId);
//     error.statusCode = 400;
//     throw error;
//   }
//   return res.status(200).json({ data: rooms });
// };

// const schemaModelTestController = async (req, res) => {
//   console.log(`model test`);
//   const filter = req.body;
//   const results = await getRoomByTest(filter);
//   console.log(`in read Room: ${results}`);
//   if (!results) {
//     const error = new Error(errMsg.invalidId);
//     error.statusCode = 400;
//     throw error;
//   }
//   return res.status(200).json(results);
// };
// const getType = async (req, res) => {};

module.exports = {
  roomForHomeControllerDefault,
  roomByFilterController,
  roomsForHomeController,
  readRoomByIdController,
  homeForLoggedUsersController,
  // readRoomsController,
  // readRoomByIdController,
  // readRoomsByModelController,
  readRoomTestController,
};
