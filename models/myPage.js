const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getMyInfo(email) {
  const myInfo = await prisma.$queryRaw`
  SELECT
  id,
  email,
  name,
  phone_number,
  password,
  profile_image

  FROM users
  WHERE email = ${email}
  `;
  console.log(myInfo, '확인');
  return myInfo;
}

async function updateMyInfo(name, phone_number, profile_image, email) {
  await prisma.$queryRaw`
    UPDATE users SET
    name=${name},
    phone_number=${phone_number},
    profile_image=${profile_image}
    WHERE email = ${email}
    `;
}

module.exports = {
  getMyInfo,
  updateMyInfo,
};
