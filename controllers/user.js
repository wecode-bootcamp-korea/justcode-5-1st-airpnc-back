const { signup, login } = require('../services/user');

async function signupController(req, res) {
  const { email, password, name, phone_number } = req.body;
  console.log(req.body);
  try {
    await signup({ email, password, name, phone_number });
    return res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
    res.status(500).json({ message: '회원가입 실패' });
    return;
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const token = await login(email, password);
    return res.status(201).json({ token, success: true, message: 'SUCCESS' });
  } catch (err) {
    //console.log('에러!!', err);
    res.status(500).json({ message: '로그인 실패' });
    return;
  }
}

module.exports = { signupController, loginController };
