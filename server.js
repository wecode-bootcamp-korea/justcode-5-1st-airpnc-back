require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

////////// TEST ///////////////
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
///////////////////////////////

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

// 리뷰 삭제하기
app.delete('/review/:id', async (req, res) => {
  //const id = req.query.id;
  //console.log(id);
  let { id } = req.params;
  const reviews = await prisma.$queryRaw`
  DELETE FROM review WHERE id=${id}`;

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
