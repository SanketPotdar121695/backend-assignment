const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userRouter = Router();

// Registration
userRouter.post('/register', async (req, res) => {
  const { email, password, location, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, password: hash, location, age });
      await user.save();
      res.status(200).send({ msg: 'Registration has been done!' });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Login (Authentication)
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.find({ email });
    // It will return an array even if only one object is found.
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        // If you are using user.findOne(), it will return a single object. Then hash value will be changed.
        if (result) {
          res.status(200).send({
            msg: 'Login successful!',
            token: jwt.sign({ userID: user._id }, process.env.myPrecious, {
              expiresIn: '1h'
            })
          });
        } else
          res.status(400).send({
            msg: 'Wrong pasword! Please Give a little bit stress to your mind & tell me the correct password. Otherwise I will kill you!!!'
          });
      });
    } else
      res.status(400).send({
        msg: 'Login failed! No such user present with the email. Please check your email ID.'
      });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { userRouter };
