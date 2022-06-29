const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

const {
  readRoomsController,
  readRoomByIdController,
} = require('../controllers/room');

// READ ALL ROOMS : No Filter Applied
router.get('/rooms', asyncWrap(readRoomsController));
router.get('/room/:id', asyncWrap(readRoomByIdController));

// // READ ROOMS with filter options
//router.get('/rooms/filtered', asyncWrap(readFilteredRoomsController));

module.exports = router;
