const errMsg = {
  roomNotExist: 'ROOM_NOT_EXIST',
  noRoomFound: 'NO_ROOM_FOUND',
};

async function checkRoomExist(roomId) {
  const room = await readRoomById(roomId);
  if (!room) {
    const error = new Error(errMsg.roomNotExist);
    error.statusCode = 400;
    throw error;
  }
}

async function checkValidRoomExist(rooms) {
  if (!rooms) {
    const error = new Error(errMsg.noRoomFound);
    error.statusCode = 400;
    throw error;
  }
}
module.exports = { checkRoomExist, checkValidRoomExist };
