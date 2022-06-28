const { deleteReviewService } = require('../services/ReviewService');

const deleteReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    console.log('controller id : ', id);
    await deleteReviewService(id);
    return res.status(201).json({ message: 'DELETE' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { deleteReviewController };
