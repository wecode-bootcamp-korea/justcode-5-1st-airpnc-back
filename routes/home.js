const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

const {
  readRoomsController,
  readRoomByIdController,
  readRoomsByModelController,
  schemaModelTestController,
} = require('../controllers/room');

// READ ALL ROOMS : No Filter Applied
router.get('/rooms', asyncWrap(readRoomsController));
router.get('/room/:id', asyncWrap(readRoomByIdController));
router.get('/test', asyncWrap(schemaModelTestController));

// // READ ROOMS with filter options
//router.get('/rooms/filtered', asyncWrap(readFilteredRoomsController));

module.exports = router;
