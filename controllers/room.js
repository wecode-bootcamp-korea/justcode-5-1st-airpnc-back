const { getRooms, getRoomById } = require('../models/room');

const errMsg = {
  invalidId: 'ID_NOT_EXIST',
};

const readRoomsController = async (req, res) => {
  const rooms = await getRooms();
};

const readRoomByIdController = async (req, res) => {
  const [id] = req.params.id;
  const room = await getRoomById(id);
  console.log(id);
  console.log(room);
  if (!room) {
    const error = new Error(errMsg.invalidId);
    error.statusCode = 400;
    throw error;
  }
  return res.status(200).json({ data: room });
};

module.exports = { readRoomsController, readRoomByIdController };
