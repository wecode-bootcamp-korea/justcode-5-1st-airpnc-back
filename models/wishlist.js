const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getWishList() {
  console.log('getWishList');
  const dbWishList = await prisma.$queryRaw`
  SELECT
    users.id,
    users.email,
    users.name, 
    room.id,
    room.price,
  FROM users
  JOIN wishlist ON users.id = wishlist.user_id
  JOIN room ON room.id = wishlist.room_id
  `;
  console.log('test: ', dbWishList);
  // return res.status(200).json({ message: 'CREATED' });
  return dbwishlist;
}
// export default getUsers;
module.exports = { getWishList };
