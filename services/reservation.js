const {
  alreadyReservation,
  makeReservation,
  getReservationList,
  deleteReservation,
  getToReviewList,
} = require('../models/reservation');

const enrollReservation = async (
  user_id,
  room_id,
  check_in,
  check_out,
  guests,
  reservation_no
) => {
  const reservationed = await alreadyReservation(room_id, check_in, check_out);
  console.log(reservationed);
  if (reservationed.length !== 0) {
    const error = new Error('Existing_Reservation');
    error.statusCode = 409;
    throw error;
  }
  const reservationDto = {
    user_id,
    room_id,
    check_in,
    check_out,
    guests,
    reservation_no,
  };
  await makeReservation(reservationDto);
};

const selectReservations = async user_id => {
  const reservations = await getReservationList(user_id);
  return reservations;
};
const selectToReviewList = async user_id => {
  const ToReviewList = await getToReviewList(user_id);
  return ToReviewList;
};

const reservationDelete = async reservation_no => {
  await deleteReservation(reservation_no);
};

module.exports = {
  enrollReservation,
  selectReservations,
  reservationDelete,
  selectToReviewList,
};
