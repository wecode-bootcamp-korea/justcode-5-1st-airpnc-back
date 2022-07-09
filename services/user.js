const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const { readUserByEmail, createUser } = require('../models/user');

const salt = bcrypt.genSaltSync();

async function signup(userinfo) {
  const { email, password, name, phone_number } = userinfo;
  if (password.length < 7) {
    const error = new Error('비밀번호는 최소 7자 입니다');
    error.statusCode = 400;
    throw error;
  }

  const user = await readUserByEmail(email);

  if (user) {
    const error = new Error('이미 존재하는 회원입니다');
    error.statusCode = 409;
    throw error;
  }

  const createUserDto = {
    email,
    password: bcrypt.hashSync(password, salt),
    name,
    phone_number,
  };
  await createUser(createUserDto);
}

async function login(email, password) {
  if (!email.includes('@')) {
    res.status(400).json({ message: 'Email or password is incorrect' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({ message: 'Email or password is incorrect' });
    return;
  }

  const users = await readUserByEmail(email);
  // console.log(users, 'users');
  if (bcrypt.compareSync(password, users.password)) {
    const token = jwt.sign({ id: users.id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return { token: token, users: users };
  } else {
    const error = new Error('Login fails');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { signup, login };
