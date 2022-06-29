const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

const {
  roomForHomeControllerDefault,
  roomByFilterController,
  roomsForHomeController,
  readRoomByIdController,
  homeForLoggedUsersController,
  // readRoomsController,
  // readRoomByIdController,
  // readRoomsByModelController,
  // schemaModelTestController,
} = require('../controllers/room');

// READ ALL ROOMS : No Filter Applied
//router.get('/rooms', asyncWrap(roomForHomeControllerDefault));

// READ ROOMS for All Users
router.get('/home', asyncWrap(roomsForHomeController));

// READ ROOMS For Logged User
router.get('/home/:id', asyncWrap(homeForLoggedUsersController));

// READ ROOM BY ID
router.get('/room/:id', asyncWrap(readRoomByIdController));

//router.get('/test', asyncWrap(schemaModelTestController));

// READ ROOMS by filter options
router.get('/rooms/filtered', asyncWrap(roomByFilterController));

module.exports = router;
