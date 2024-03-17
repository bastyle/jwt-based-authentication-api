const { body } = require('express-validator');

const {
  signUp,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
} = require("../controller/userController");
const { STUDENT, ADMIN } = require('../models/roleEnum');

const router = require("express").Router();

router.post("/signUp", [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), 
  body('roleId').custom(value => {
    if (value !== ADMIN && value !== STUDENT) {
        throw new Error('Invalid roleId value');
    }
    return true;
})
], signUp);

router.post("/login", login);

router.delete("/:id", deleteUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;