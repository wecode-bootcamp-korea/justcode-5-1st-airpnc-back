const { Router } = require('express');
const asyncWrap = require('../async-wrap');
const {
  updateInfoController,
  getMyInfoController,
} = require('../controllers/myPage');
const router = Router();

router.get('/mypage/:email', getMyInfoController);
router.put('/mypage', updateInfoController);

module.exports = router;
