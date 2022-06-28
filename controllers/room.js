const { prisma } = require('@prisma/client');
const {
  getRooms,
  getRoomById,
  getRoomsByModel,
  getCities,
} = require('../models/room');

const errMsg = {
  invalidId: 'ID_NOT_EXIST',
};

const readRoomsController = async (req, res) => {
  // const rooms = await getRooms();
  // console.log(`in readRoom : ${rooms}`);
  // return res.status(200).json({ data: rooms });
};

const readRoomByIdController = async (req, res) => {
  // const [id] = req.params.id;
  // const room = await getRoomById(id);
  // console.log(id);
  // console.log(room);
  // if (!room) {
  //   const error = new Error(errMsg.invalidId);
  //   error.statusCode = 400;
  //   throw error;
  // }
  // return res.status(200).json({ data: room });
};

const readRoomsByModelController = async (req, res) => {
  console.log(`hi2`);
  const rooms = await getRoomsByModel();
  console.log(`in read Room: ${rooms}`);
  if (!rooms) {
    const error = new Error(errMsg.invalidId);
    error.statusCode = 400;
    throw error;
  }
  return res.status(200).json({ data: rooms });
};

const schemaModelTestController = async (req, res) => {
  console.log(`model test`);
  const cities = await getCities();
  console.log(`in read Room: ${cities}`);
  if (!cities) {
    const error = new Error(errMsg.invalidId);
    error.statusCode = 400;
    throw error;
  }
  return res.status(200).json({ data: cities });
};
const getType = async (req, res) => {};

module.exports = {
  readRoomsController,
  readRoomByIdController,
  readRoomsByModelController,
  schemaModelTestController,
};
