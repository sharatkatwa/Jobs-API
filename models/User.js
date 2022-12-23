const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
    minlength: [3, 'A name atleast need 3 charecters'],
    maxlength: [30, 'Please provide name less then 30 charecters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide you email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],

    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: [6, 'Password must contain atleast 6 charecters'],
  },
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
