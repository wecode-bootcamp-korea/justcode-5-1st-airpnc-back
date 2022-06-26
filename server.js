require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

// 리뷰 불러오기 (2번 방에 대한 리뷰)
app.get('/review/2', async (req, res) => {
  // 1. 데이터를 가지고 온다. 2번 데이터만
  const reviews = await prisma.$queryRaw`
    select users.name, users.created_at, review.review
    FROM review
    LEFT JOIN users ON review.user_id = users.id
    where room_id=2;
    `;
  console.log('어디갔어', reviews);

  // 2. return response
  return res.status(200).json({ data: reviews });
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;

// console.log(PORT);

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect(); // 에러가 발생했을 시에 database 연결을 종료합니다.
  }
};

start();
