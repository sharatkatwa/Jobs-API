const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError(
      'Please login to access this route(Invalid Authentication)'
    );
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Invalid Authentication, Please login');
  }
};

module.exports = auth;
