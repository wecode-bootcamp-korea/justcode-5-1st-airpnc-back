const { getWishList } = require('../models/wishlist');

const wishList = async (req, res) => {
  console.log(`in controllers`);

  const wishList = await getWishList();
  console.log(`before return ${wishList}`);

  return res.status(200).json({ data: wishList });
};
module.exports = { wishList };
