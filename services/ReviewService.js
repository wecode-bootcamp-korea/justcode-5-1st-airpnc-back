const {
  createReviewDao,
  readReviewsDao,
  readMyReviewsDao,
  deleteReviewDao,
  isValidReview,
  updateReviewDao,
} = require('../models/ReviewDao');

async function writeReviewService(
  review,
  score,
  user_id,
  room_id,
  reservation_id
) {
  await createReviewDao(review, score, user_id, room_id, reservation_id);
}

async function readReviewService(id) {
  const reviews = await readReviewsDao(id);
  return reviews;
}

/*
const readReviewService = async id => {
  const reviews = await readReviewsDao(id);
  if (!reviews) {
    const error = new Error('ROOM_REVIEW_LOAD_FAILED');
    error.statusCode = 400;
    throw error;
  }

  return reviews;
}; */

/*
async function readMyReviewService(id) {
  const myReviews = await readMyReviewsDao(id);
  return myReviews;
}*/

// readMyReviewService - 사진까지 뽑아오도록 수정
const readMyReviewService = async id => {
  const [selectedMyReview, photos] = await readMyReviewsDao(id);
  return [selectedMyReview, photos];
};

// checkReviewExist can be moved into middleware dir
async function checkReviewExist(id) {
  const isExist = await isValidReview(id);
  if (isExist.length === 0) {
    const error = new Error('DELETING FAILED');
    error.statusCode = 400;
    throw error;
  }
}

async function deleteReviewService(id) {
  await checkReviewExist(id);
  await deleteReviewDao(id);
}

const updateReviewService = async (review, score, id) => {
  // 해당 리뷰를 데이터베이스 내에서 수정
  const affectedUpdatedRows = await updateReviewDao(review, score, id);
  console.log('affectedUpdatedRows : ', affectedUpdatedRows);

  // 리뷰 수정이 일어나지 않을 경우 에러 처리
  if (affectedUpdatedRows == 0) {
    const error = new Error('UPDATING FAILED');
    error.statusCode = 400;
    throw error;
  }

  return affectedUpdatedRows;
};

module.exports = {
  writeReviewService,
  readReviewService,
  readMyReviewService,
  deleteReviewService,
  updateReviewService,
};
