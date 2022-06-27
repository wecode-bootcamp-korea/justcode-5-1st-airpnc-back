const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();

// const { readRoomsController, readFilteredRoomsController }

// // READ ALL ROOMS : No Filter Applied
// router.get('/rooms', asyncWrap(readRoomsController));

// // READ ROOMS with filter options
//router.get('/rooms/filtered', asyncWrap(readFilteredRoomsController));

module.exports = router;
