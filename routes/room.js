const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

const {
  roomsForHomeController,
  readRoomByIdController,
  homeForLoggedUsersController,
  // NOT IN USE
  //filterRequestOptionController,
  //roomForHomeControllerDefault,
  //roomByFilterController,
  // readRoomsController,
  // readRoomByIdController,
  // TEST CODE
  readRoomTestController,
} = require('../controllers/room');

// READ ROOMS for All Users
router.get('/home', asyncWrap(roomsForHomeController));
router.post('/home', asyncWrap(roomsForHomeController));

// READ ROOMS For Logged User
router.get('/home/:id', asyncWrap(homeForLoggedUsersController));
router.post('/home/:id', asyncWrap(homeForLoggedUsersController));

// READ ROOM BY ID
router.get('/room/:id', asyncWrap(readRoomByIdController));

///////////////////// NOT IN USE ////////////////////
// READ ALL ROOMS : No Filter Applied
//router.get('/rooms', asyncWrap(roomForHomeControllerDefault));

// POST filter option
//router.post('/filteropt' asyncWrap(filterRequestOptionController));

// READ ROOMS by filter options
//router.get('/rooms/filtered', asyncWrap(roomByFilterController));

//////////////////// TEST CODE ///////////////////////
router.get('/test', asyncWrap(readRoomTestController));
router.post('/test', asyncWrap(readRoomTestController));
//////////////////////////////////////////////////////

module.exports = router;
