const { getRooms } = require('../models/room');

const readRoomsController = async (req, res) => {
  const rooms = await getRooms();
};

module.exports = { readRoomsController };
