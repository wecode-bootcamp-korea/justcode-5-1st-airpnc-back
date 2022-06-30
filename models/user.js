const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(createUserDto) {
  const { email, password, name, phone_number } = createUserDto;
  console.log(createUserDto, '포스트맨');
  return await prisma.$queryRaw`
INSERT INTO
    users (email, password, name,phone_number)
VALUES (${email},${password}, ${name},${phone_number})`;
}

async function readUserByEmail(email) {
  const [users] = await prisma.$queryRaw`
SELECT
id,
email,
password

FROM users
WHERE email = ${email}
`;
  console.log(users, '확인');
  return users;
}

module.exports = { createUser, readUserByEmail };
