const { getMyInfoService, updateService } = require('../services/myPage');

async function getMyInfoController(req, res) {
  const { email } = req.params;
  try {
    const myInfo = await getMyInfoService(email);
    return res.status(201).json(myInfo);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function updateInfoController(req, res) {
  try {
    const { name, phone_number, profile_image, email } = req.body;
    console.log(req.body, 33333);
    await updateService(name, phone_number, profile_image, email);
    return res
      .status(201)
      .json({ message: '유저 정보가 업데이트 되었습니다.' });
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = { getMyInfoController, updateInfoController };
