const {
  writeReviewService,
  isExistReview,
  readReviewService,
  readMyReviewService,
  deleteReviewService,
  updateReviewService,
} = require('../services/ReviewService');

const createReviewController = async (req, res) => {
  try {
    const { review, score, user_id, room_id, reservation_id } = req.body;
    console.log(
      'createReviewController : ',
      review,
      score,
      user_id,
      room_id,
      reservation_id
    );
    await writeReviewService(review, score, user_id, room_id, reservation_id);

    return res.status(201).json({ message: 'CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const readReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    //await isExistReview(id);
    const reviews = await readReviewService(id);
    return res.status(201).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const readMyReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    //await isExistReview(id);
    const myReviews = await readMyReviewService(id);
    return res.status(201).json(myReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteReviewController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('deleteReviewController id : ', id);
    await deleteReviewService(id);
    return res.status(200).json({ message: 'DELETED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const updateReviewController = async (req, res) => {
  try {
    let { id } = req.params;
    const { review, score } = req.body;
    console.log(
      'updateReviewController - review, score, id : ',
      review,
      score,
      id
    );
    await updateReviewService(review, score, id);

    return res.status(201).json({ message: 'UPDATED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReviewController,
  readReviewController,
  readMyReviewController,
  deleteReviewController,
  updateReviewController,
};
