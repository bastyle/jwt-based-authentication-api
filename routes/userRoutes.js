const { body } = require('express-validator');

const {
  signUp,
  deleteUser,
  getAllUsers,
  login,
  getAdminData,
  getStudentData,
} = require("../controller/userController");
const { STUDENT, ADMIN } = require('../models/roleEnum');
const auth = require('../middleware/auth');
const adminValidation = require('../middleware/adminValidation');

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
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

//
router.get("/adminPortal", auth, adminValidation, getAdminData);
router.get("/studentData", auth, getStudentData);

module.exports = router;