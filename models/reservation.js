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
  const [ReserevationList, photos] = await prisma.$transaction([
    prisma.$queryRaw`SELECT reservation.id, reservation.room_id, reservation.reservation_no, 
    reservation.created_at, reservation.guests , reservation.check_in, reservation.check_out,
     room.name,city.name AS city,city.country from reservation JOIN room ON reservation.room_id = room.id JOIN room_city ON reservation.room_id = room_city.room_id 
     JOIN city ON room_city.city_id=city.id WHERE reservation.user_id = ${user_id}`,
    prisma.$queryRaw`SELECT room.id as room_id,JSON_ARRAYAGG(CASE WHEN photo.file_url IS NOT NULL THEN JSON_OBJECT('url',photo.file_url) END) AS photo_url FROM photo JOIN room ON photo.room_id = room.id JOIN reservation ON room.id = reservation.room_id where reservation.user_id=${user_id} GROUP BY room.id;`,
  ]);
  return [ReserevationList, photos];
}

async function getToReviewList(user_id) {
  const [ToReviewList, photoList] = await prisma.$transaction([
    prisma.$queryRaw`SELECT reservation.id,reservation.room_id,
    room.name,city.name AS city, city.country , review.review
     from reservation JOIN room ON reservation.room_id = room.id
    JOIN room_city ON reservation.room_id = room_city.room_id
   JOIN city ON room_city.city_id=city.id
   LEFT JOIN review ON reservation.id = review.reservation_id
   WHERE reservation.user_id = ${user_id} AND review.review is null`,
    prisma.$queryRaw`SELECT room.id as room_id,JSON_ARRAYAGG(CASE WHEN photo.file_url IS NOT NULL THEN JSON_OBJECT('url',photo.file_url) END) AS photo_url FROM photo JOIN room ON photo.room_id = room.id JOIN reservation ON room.id = reservation.room_id where reservation.user_id=${user_id} GROUP BY room.id;`,
  ]);
  return [ToReviewList, photoList];
}

async function deleteReservation(reservation_no) {
  await prisma.$queryRaw`DELETE FROM reservation WHERE reservation_no=${reservation_no}`;
}

// async function getReservationList(user_id) {
//   const ReserevationList =
//     await prisma.$queryRaw`SELECT reservation.id, reservation.room_id, reservation.reservation_no,
//   reservation.created_at, reservation.guests , reservation.check_in, reservation.check_out,
//    room.name,city.name AS city,city.country from reservation JOIN room ON reservation.room_id = room.id JOIN room_city ON reservation.room_id = room_city.room_id
//    JOIN city ON room_city.city_id=city.id WHERE reservation.user_id = ${user_id}`;
//   return ReserevationList;
// }

// async function getToReviewList(user_id) {
//   const ToReviewList = prisma.$queryRaw`SELECT reservation.id,reservation.room_id,
//   room.name,city.name AS city, city.country , review.review
//    from reservation JOIN room ON reservation.room_id = room.id
//   JOIN room_city ON reservation.room_id = room_city.room_id
//  JOIN city ON room_city.city_id=city.id
//  LEFT JOIN review ON reservation.id = review.reservation_id
//  WHERE reservation.user_id = ${user_id} AND reservation.check_in <= now() AND review.review is null`;
//   return ToReviewList;
// }

module.exports = {
  alreadyReservation,
  makeReservation,
  getReservationList,
  deleteReservation,
  getToReviewList,
};
