const { updateMyInfo, getMyInfo } = require('../models/myPage');

async function getMyInfoService(email) {
  const myInfo = await getMyInfo(email);
  return myInfo;
}
async function updateService(name, phone_number, profile_image, email) {
  await updateMyInfo(name, phone_number, profile_image, email);
}

module.exports = { updateService, getMyInfoService };
