const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const router = Router();
const {
  setReservation,
  getReservation,
  deleteController,
  ToReviewListController,
} = require('../controllers/reservation');

router.post('/', setReservation);
router.get('/:userId', getReservation);
router.get('/toReview/:userId', ToReviewListController);
router.delete('/:reservationNumber', deleteController);
module.exports = router;
