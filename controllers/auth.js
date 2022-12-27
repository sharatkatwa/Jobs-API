const StatusCodes = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const User = require('../models/User');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    result: 'success',
    user: { username: user.name },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide username and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCurrect = await user.comparePassword(password);
  if (!isPasswordCurrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ result: 'success', user: { username: user.name }, token });
};

module.exports = { register, login };
