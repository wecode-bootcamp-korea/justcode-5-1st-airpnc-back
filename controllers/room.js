const {
  getRoomsForMain,
  getRoomsByFilter,
  getRoomById,
} = require('../services/room');

const errMsg = {
  invalidId: 'ID_NOT_EXIST',
};

const roomForHomeControllerDefault = async (req, res) => {
  console.log(`in roomForHomeController`);
  const rooms = await getRoomsForMain();
  console.log('in controller ', rooms);
  if (!rooms) {
    const error = new Error(errMsg.invalidId);
    error.statusCode = 400;
    throw error;
  }
  return res.status(200).json(rooms);
};

const roomByFilterController = async (req, res) => {
  const filters = req.body;
  console.log('filters ', filters);
  const rooms = await getRoomsByFilter(filters);
  if (!rooms) {
    const error = new Error(errMsg.invalidRoom);
    error.statusCode = 400;
    throw error;
  }
  return res.status(200).json(rooms);
};

const roomsForHomeController = async (req, res) => {
  const filters = req.body;
  console.log('filters : ', filters);
  if (Object.keys(filters).length === 0) {
    console.log('calling getRoomsForMain');
  } else {
    console.log('calling getRoomsByFilter');
  }
  const rooms =
    Object.keys(filters).length === 0
      ? await getRoomsForMain()
      : await getRoomsByFilter(filters);

  if (!rooms) {
    const error = new Error(errMsg.invalidRoom);
    error.statusCode = 400;
  }
  return res.status(200).json(rooms);
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// const readRoomsController = async (req, res) => {
//   // const rooms = await getRooms();
//   // console.log(`in readRoom : ${rooms}`);
//   // return res.status(200).json({ data: rooms });
// };

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
  // readRoomsController,
  // readRoomByIdController,
  // readRoomsByModelController,
  // schemaModelTestController,
};
