const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  username: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('User', userSchema);
