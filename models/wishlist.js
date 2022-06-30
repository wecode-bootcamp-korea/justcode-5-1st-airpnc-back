const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getWishList(id) {
  console.log('getWishList');
  const dbWishList = await prisma.$queryRaw`

  SELECT
  room.id,
  room.price,
  room.address,
  room.name,
  room.description

  FROM room

  LEFT JOIN wishlist on wishlist.room_id = room.id
  JOIN users on users.id = wishlist.user_id

  `;
  // console.log('test: ', dbWishList);
  // return res.status(200).json({ message: 'CREATED' });
  return dbWishList;
}
// export default getUsers;

async function DeletWishList(id, room_id) {
  console.log('getWishList');
  const dbWishList = await prisma.$queryRaw`
  DELETE FROM wishlist WHERE user_id = ${id} and room_id = ${room_id}
  
  `;
  console.log('test: ', dbWishList);
  // return res.status(200).json({ message: 'CREATED' });
  return dbWishList;
}

async function InsertWishList(id, room_id) {
  console.log('getWishList');
  const dbWishList = await prisma.$queryRaw`
  INSERT INTO wishlist(user_id,room_id) values( ${id},${room_id})
  
  `;
  console.log('test: ', dbWishList);
  // return res.status(200).json({ message: 'CREATED' });
  return dbWishList;
}

module.exports = { getWishList, DeletWishList, InsertWishList };
