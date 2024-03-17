const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
require('dotenv').config();


// Create a new user
module.exports.signUp = async (req, res) => {
    try {
        console.log('adding user...');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => {
                return {
                    field: error.path,
                    message: error.msg
                };
            });
            return res.status(400).json({ errors: errorMessages });
        }
        const user = await userModel.create(req.body);
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate key error '+JSON.stringify(error.keyValue) });
        }
        res.status(500).json({ error: 'Failed to create user:' + error });
    }
}

// delete a user
module.exports.deleteUser = async (req, res) => {
    try {
        console.log('deleting user...')
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

// Get all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

module.exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('logging in...'+ username, password)
      const user = await userModel.findOne({ username });

      if(!user){
        return res.status(404).json({ message: 'User not found!' });
      }
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.userId, profile: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
      //res.json({ token });
      res.status(201).json({user: user.userId})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
    }
  }


  module.exports.getAdminData = async (req, res) => {
    try {
        console.log('fetching admin data...')
        const adminInfo = {
            name: "Admin",
            role: "Administrator",
            email: "admin@example.com",
            privilegedInfo: {
                totalUsers: 100, 
                totalRevenue: 10000,
                serverStatus: "Running", 
                activeUsers: 50,                 
            }
        };
        console.log('adminInfo::', adminInfo);

        res.json(adminInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user....' });
    }
}

module.exports.getStudentData = async (req, res) => {
    try {
        console.log('fetching student data...')
        const studentsSummary = {
            totalStudents: 156, 
            averageGPA: 3.5,
            mostPopularMajor: "Computer Science",
        };
        console.log('studentsSummary::', studentsSummary);
        res.json(studentsSummary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to studentInfo!' });
    }
}
  