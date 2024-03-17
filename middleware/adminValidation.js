const roleEnum = require("../models/roleEnum");


module.exports = (req, res, next) => {
  if (req.user.role !== roleEnum.ADMIN) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
};