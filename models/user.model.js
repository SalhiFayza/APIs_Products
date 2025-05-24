const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

// Mongoose Schema
const userSchema = new mongoose.Schema({
    image: String,
    userName: String,
    email: String,
    password: String
});
const User = mongoose.model('users', userSchema);

// Joi Validation Schemas
const registerValidationSchema = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateValidationSchema = Joi.object({
    image: Joi.string().uri().required(),
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const privateKey = process.env.PRIVATE_KEY;

// Register
exports.register = async (userName, email, password) => {
    const { error } = registerValidationSchema.validate({ userName, email, password });
    if (error) {
        throw new Error(error.details[0].message);
    }

    const existing = await User.findOne({ email });
    if (existing) {
        throw new Error('This user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    return await newUser.save();
};

// Login
exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("This email does not exist");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { id: user._id, userName: user.userName },
        privateKey,
        { expiresIn: '1h' }
    );
    return token;
};

// Get all users
exports.getAllUsers = async () => {
    return await User.find();
};

// Get single user by ID
exports.getUserById = async (id) => {
    return await User.findById(id);
};

// Delete user by ID with validation
exports.deleteUserById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
    }

    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }

    return await User.deleteOne({ _id: id });
};

// Update user
exports.updateUserById = async (id, image, userName, email, password) => {
    const { error } = updateValidationSchema.validate({ image, userName, email, password });
    if (error) {
        throw new Error(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.updateOne(
        { _id: id },
        { image, userName, email, password: hashedPassword }
    );
};

exports.registerValidationSchema = registerValidationSchema;
exports.updateValidationSchema = updateValidationSchema;
