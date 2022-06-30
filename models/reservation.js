const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function alreadyReservation(room_id, check_in, check_out) {
  const Reservationed = prisma.$queryRaw`select * from reservation where room_id=${room_id} AND check_in BETWEEN ${check_in} AND ${check_out} `;
  return Reservationed;
}

async function makeReservation(reservationDto) {
  await prisma.$queryRaw`Insert Into reservation(reservation_no, check_in, check_out, guests, user_id, room_id) VALUES (${reservationDto.reservation_no}, ${reservationDto.check_in}, ${reservationDto.check_out}, ${reservationDto.guests}, ${reservationDto.user_id}, ${reservationDto.room_id})`;
}

async function getReservationList(user_id) {
  const ReserevationList =
    await prisma.$queryRaw`SELECT reservation.id, reservation.room_id, reservation.reservation_no, 
  reservation.created_at, reservation.guests , reservation.check_in, reservation.check_out, (SELECT JSON_ARRAYAGG(CASE WHEN photo.file_url IS NOT NULL THEN JSON_OBJECT('url',photo.file_url) END) FROM photo GROUP BY room_id) AS photo_url,
   room.name,city.name AS city,city.country from reservation JOIN room ON reservation.room_id = room.id JOIN room_city ON reservation.room_id = room_city.room_id 
   JOIN city ON room_city.city_id=city.id WHERE reservation.user_id = ${user_id}`;
  return ReserevationList;
}

async function getToReviewList(user_id) {
  const ToReviewList =
    await prisma.$queryRaw`SELECT reservation.id,reservation.room_id,
    room.name,city.name AS city, city.country , review.review, (SELECT JSON_ARRAYAGG(CASE WHEN photo.file_url IS NOT NULL THEN JSON_OBJECT('url',photo.file_url) END)
    FROM photo JOIN reservation ON photo.room_id = reservation.room_id WHERE reservation.user_id = ${user_id} GROUP BY photo.room_id) AS photo_url
     from reservation JOIN room ON reservation.room_id = room.id
    JOIN room_city ON reservation.room_id = room_city.room_id
   JOIN city ON room_city.city_id=city.id
   LEFT JOIN review ON reservation.id = review.reservation_id
   WHERE reservation.user_id = ${user_id} AND reservation.check_out <= NOW() AND review.review is null `;
  return ToReviewList;
}

async function deleteReservation(reservation_no) {
  await prisma.$queryRaw`DELETE FROM reservation WHERE reservation_no=${reservation_no}`;
}

module.exports = {
  alreadyReservation,
  makeReservation,
  getReservationList,
  deleteReservation,
  getToReviewList,
};
