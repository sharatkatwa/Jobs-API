const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Something went wrong please try again later' });
};

module.exports = errorHandlerMiddleware;
