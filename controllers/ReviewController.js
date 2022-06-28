const { deleteReviewService } = require('../services/ReviewService');

const deleteReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    console.log('controller id : ', id);
    await deleteReviewService(id);
    return res.status(201).json({ message: 'DELETE' });
  } catch (err) {
    console.log(err);
    return res
      .status(err.statusCode || 500)
      .json(err.message || { message: 'DELETE_RESERVATION_FAILED' });
  }
};

module.exports = { deleteReviewController };
