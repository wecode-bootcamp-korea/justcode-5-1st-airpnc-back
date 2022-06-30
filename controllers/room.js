const { readRoomsTest } = require('../models/room');

const {
  getRoomsForMain,
  getRoomsByFilter,
  getRoomsForAllUsers,
  getRoomsForLoggedUser,
  getRoomById,
} = require('../services/room');

const roomsForHomeController = async (req, res) => {
  const filters = req.body;
  const rooms = await getRoomsForAllUsers(filters);
  return res.status(200).json(rooms);
};

const homeForLoggedUsersController = async (req, res) => {
  const userId = req.params.id;
  const filters = req.body;
  const rooms = await getRoomsForLoggedUser(userId, filters);
  return res.status(200).json(rooms);
};

const readRoomByIdController = async (req, res) => {
  const roomId = req.params.id;
  const room = await getRoomById(roomId);
  return res.status(200).json(room);
};

/////////// NOT IN USE ////////////////////////////////////////////////////////////

const roomForHomeControllerDefault = async (req, res) => {
  const rooms = await getRoomsForMain();
  return res.status(200).json(rooms);
};

const roomByFilterController = async (req, res) => {
  const filters = req.body;
  const rooms = await getRoomsByFilter(filters);
  return res.status(200).json(rooms);
};

//////////////////// TEST CODE /////////////////////////
const readRoomTestController = async (req, res) => {
  const items = req.body;
  const rooms = await readRoomsTest(items);
  return res.status(200).json(rooms);
};

module.exports = {
  roomsForHomeController,
  homeForLoggedUsersController,
  readRoomByIdController,
  ////////////////////////
  roomByFilterController,
  roomForHomeControllerDefault,
  // readRoomsController,
  // readRoomByIdController,
  // readRoomsByModelController,
  readRoomTestController,
};
