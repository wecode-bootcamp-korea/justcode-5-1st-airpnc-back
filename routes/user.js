const express = require('express');
const {
  signupController,
  loginController,
  myPageController,
} = require('../controllers/user');
const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/mypage/:email', myPageController);

module.exports = router;
