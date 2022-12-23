const StatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  res.status(StatusCodes.CREATED).json({
    result: 'success',
    user: { username: user.name },
    token,
  });
};

const login = async (req, res) => {
  res.send('Login User');
};

module.exports = { register, login };
