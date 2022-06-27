require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const homeRoutes = require('./routes/home');
const detailRoutes = require('./routes/detail');
const reservationRoutes = require('./routes/reservation');
const myPageRoutes = require('./routes/myPage');
const wishListRoutes = require('./routes/wishList');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');

const app = express();
app.use(cors());
app.use(express.json());

app.use(homeRoutes);
app.use(detailRoutes);
app.use(reservationRoutes);
app.use(myPageRoutes);
app.use(wishListRoutes);
app.use(loginRoutes);
app.use(signupRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

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

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`server start : http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.err(err);
  }
};

start();
