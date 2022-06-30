const {
  getWishList,
  DeletWishList,
  InsertWishList,
} = require('../models/wishlist');

const wishList = async (req, res) => {
  console.log(`in controllers`);
  const [id] = req.params.id;
  const wishList = await getWishList(id);
  console.log(`before return ${wishList}`);

  return res.status(200).json({ data: wishList });
};

const deletwishList = async (req, res) => {
  const [id] = req.params.id;

  const wishList = await DeletWishList(1, id);

  return res.status(204).json({ 메시지: '삭제성공' });
};

const insertwishList = async (req, res, next) => {
  try {
    // const { userId, roomId } = req.body;
    console.log(req.body);
    const wishList = await InsertWishList(userId, roomId);

    return res.status(500).json({ message: 'CREATED' });
  } catch (err) {
    next(err);
  }
};
module.exports = { wishList, deletwishList, insertwishList };
