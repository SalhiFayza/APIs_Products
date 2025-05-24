const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const schemaAdmin = mongoose.Schema({
    userName: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const url = process.env.URL;
const privateKey = process.env.PRIVATE_KEY;

const Admin = mongoose.model('admin', schemaAdmin);

// ==================== Register ====================
exports.register = (userName, email, password) => {
    return new Promise((resolve, reject) => {
        if (!userName || userName.trim() === '') {
            return reject("Username is required");
        }

        if (!email || email.trim() === '') {
            return reject("Email is required");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return reject("Invalid email format");
        }

        if (!password) {
            return reject("Password is required");
        }

        if (password.length < 6) {
            return reject("Password must be at least 6 characters long");
        }
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Admin.findOne({ email }))
        .then((doc) => {
            if (doc) {
                mongoose.disconnect();
                reject('This admin already exists');
            } else {
                return bcrypt.hash(password, 10);
            }
        })
        .then((hashedPassword) => {
            const newAdmin = new Admin({ userName, email, password: hashedPassword });
            return newAdmin.save();
        })
        .then((savedAdmin) => {
            mongoose.disconnect();
            resolve(savedAdmin);
        })
        .catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};


// ==================== Login ====================
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Admin.findOne({ email }))
        .then((admin) => {
            if (!admin) {
                mongoose.disconnect();
                reject("Invalid email or password");
            } else {
                return bcrypt.compare(password, admin.password)
                .then((isMatch) => {
                    if (isMatch) {
                        const token = jwt.sign({
                            id: admin._id,
                            userName: admin.userName,
                            email: admin.email,
                            role: 'Admin'
                        }, privateKey, { expiresIn: '1h' });

                        mongoose.disconnect();
                        resolve({ token, role: 'Admin', userName: admin.userName });
                    } else {
                        mongoose.disconnect();
                        reject('Invalid email or password');
                    }
                });
            }
        })
        .catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};
