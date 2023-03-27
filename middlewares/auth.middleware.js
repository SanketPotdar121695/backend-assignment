const jwt = require('jsonwebtoken');
require('dotenv').config();

const authUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // To take care of 'Bearer'
  if (token) {
    const decoded = jwt.verify(token, 'masai');
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else res.status(400).send({ msg: 'Please login first!' });
  } else res.status(400).send({ msg: 'Please login first!' });
};

module.exports = { authUser };
