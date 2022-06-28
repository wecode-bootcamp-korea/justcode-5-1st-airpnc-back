const { deleteReviewService } = require('../services/ReviewService');

// const deleteReviewController = async (req, res) => {
//   try {
//     let id = req.params;
//     console.log('controller id : ', id);
//     await deleteReviewService(id);
//     return res.status(201).json({ message: 'DELETE' });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(err.statusCode || 500)
//       .json(err.message || { message: 'DELETE_RESERVATION_FAILED' });
//   }
// };

const deleteReviewController = async (req, res) => {
  const id = req.params.id;
  await deleteReviewService(id);
  return res.status(200).json({ message: 'DELETED' });
};

module.exports = { deleteReviewController };
