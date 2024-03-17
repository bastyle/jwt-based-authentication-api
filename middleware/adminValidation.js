const jwt = require('jsonwebtoken');
const roleEnum = require("../models/roleEnum");
require('dotenv').config();

module.exports = (req, res, next) => {
  console.log('adminValidation middleware');
  const token = req.headers.authorization.split(' ')[1]; // Extract token after 'Bearer '
  //console.log('token', token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    //console.log('decoded::', decoded);
    console.log('role::', decoded.profile);
    if (decoded.profile !== roleEnum.ADMIN) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};