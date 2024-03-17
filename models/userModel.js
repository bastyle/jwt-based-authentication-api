const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const RoleEnum = require('./roleEnum');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, userId:{        
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 25,
        required: true
    },
    roleId: {
        type: String,
        required: true,
        enum: [RoleEnum.ADMIN, RoleEnum.STUDENT],
        default: RoleEnum.STUDENT
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);    
    next();
});
module.exports = mongoose.model('User', userSchema, 'assignment_3_users');