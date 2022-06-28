require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const homeRoutes = require('./routes/home');
// const detailRoutes = require('./routes/detail');
// const reservationRoutes = require('./routes/reservation');
// const myPageRoutes = require('./routes/myPage');
// const wishListRoutes = require('./routes/wishList');
// const loginRoutes = require('./routes/login');
// const signupRoutes = require('./routes/signup');
const reviewRoutes = require('./routes/ReviewRouter.js');

const app = express();
app.use(cors());
app.use(express.json());

////////// TEST ///////////////
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
///////////////////////////////

// app.use(homeRoutes);
// app.use(detailRoutes);
// app.use(reservationRoutes);
// app.use(myPageRoutes);
// app.use(wishListRoutes);
// app.use(loginRoutes);
// app.use(signupRoutes);
app.use('/review', reviewRoutes);

/*
// 리뷰 불러오기 (2번 방에 대한 리뷰)
app.get('/review/:id', async (req, res) => {
  //const id = req.query.id;
  //console.log(id);
  let { id } = req.params;
  // 1. 데이터를 가지고 온다. 2번 데이터만
  const reviews = await prisma.$queryRaw`
  SELECT
    users.name,
    review.review,
    review.score,
    review.created_at
  FROM review
  JOIN 
    users on review.user_id = users.id 
  JOIN
    room on review.room_id = room.id
  WHERE
    review.room_id = ${type}`;
  console.log('어디갔어', reviews);

  // 2. return response
  return res.status(200).json({ data: reviews });
});*/

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;

const start = async () => {
  try {
    console.log('start trying here');
    server.listen(PORT, () => {
      console.log(`server start : http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.err(err);
    await prisma.$disconnect();
  }
};

start();
