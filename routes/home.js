const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

const {
  roomForHomeControllerDefault,
  roomByFilterController,
  roomsForHomeController,
  readRoomByIdController,
  homeForLoggedUsersController,
  filterRequestOptionController,
  // readRoomsController,
  // readRoomByIdController,
  readRoomTestController,
} = require('../controllers/room');

// READ ALL ROOMS : No Filter Applied
//router.get('/rooms', asyncWrap(roomForHomeControllerDefault));

// READ ROOMS for All Users
router.get('/home', asyncWrap(roomsForHomeController));
router.post('/home', asyncWrap(roomsForHomeController));

// READ ROOMS For Logged User
router.get('/home/:id', asyncWrap(homeForLoggedUsersController));
router.post('/home/:id', asyncWrap(homeForLoggedUsersController));

// READ ROOM BY ID
router.get('/room/:id', asyncWrap(readRoomByIdController));

// POST filter option
//router.post('/filteropt' asyncWrap(filterRequestOptionController));

// READ ROOMS by filter options
//router.get('/rooms/filtered', asyncWrap(roomByFilterController));

//test
router.get('/test', asyncWrap(readRoomTestController));
router.post('/test', asyncWrap(readRoomTestController));
module.exports = router;
