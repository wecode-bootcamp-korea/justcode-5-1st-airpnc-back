const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(createUserDto) {
  const { email, password, name } = createUserDto;

  await prisma.$queryRaw`
INSERT INTO
    users (email, password, name)
VALUES (${email}, ${password}, ${name})`;
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
  return users;
}

module.exports = { createUser, readUserByEmail };
