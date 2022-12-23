const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const connectDB = (url) => {
  return mongoose.set('strictQuery', false).connect(url);
};

module.exports = connectDB;
