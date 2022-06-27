require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const users = {
  email: ['minuk3508@gmail.com'],
  password: ['1234567'],
};

app.post('/users/login', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (users.email.includes(email)) {
    const emailIndex = users.email.indexOf(email);
    if (users.password[emailIndex] === password) {
      return res.json({
        success: true,
      });
    }
  }
  return res.json({
    success: false,
    msg: '로그인에 실패하였습니다.',
  });
});
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
