const mongoose = require('mongoose');

//User schema
const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    location: String,
    age: Number
  },
  {
    versionKey: false
  }
);

//User model
const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };
