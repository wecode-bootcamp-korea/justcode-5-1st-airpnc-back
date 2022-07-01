const {
  enrollReservation,
  selectReservations,
  reservationDelete,
  selectToReviewList,
} = require('../services/reservation');
const setReservation = async (req, res, next) => {
  try {
    const { user_id, room_id, check_in, check_out, guests, reservation_no } =
      req.body;
    const requiredKey = [
      'user_id',
      'room_id',
      'check_in',
      'check_out',
      'guests',
      'reservation_no',
    ];
    const hasRequiredKey = Object.entries(req.body).every(
      property => requiredKey.includes(property[0]) && property[1]
    );
    if (!hasRequiredKey) {
      throw new Error('Key, value 없음');
    }
    await enrollReservation(
      user_id,
      room_id,
      check_in,
      check_out,
      guests,
      reservation_no
    );
    return res.status(201).json({ message: 'reservation completed' });
  } catch (err) {
    next(err);
  }
};

const getReservation = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const reservationList = await selectReservations(id);
    return res.status(201).json(reservationList);
  } catch (err) {
    next(err);
  }
};

const ToReviewListController = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const toReviewList = await selectToReviewList(id);
    return res.status(201).json(toReviewList);
  } catch (err) {
    next(err);
  }
};

const deleteController = async (req, res, next) => {
  try {
    const reservation_no = req.params.reservationNumber;
    await reservationDelete(reservation_no);
    return res.status(201).json({ message: 'delete complete' });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  setReservation,
  getReservation,
  deleteController,
  ToReviewListController,
};
