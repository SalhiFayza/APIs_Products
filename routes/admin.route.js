const express = require('express');
const router = express.Router();
const adminModel = require('../models/admin.model');

// Register Admin
router.post('/register', (req, res) => {
    const { userName, email, password } = req.body;

    adminModel.register(userName, email, password)
        .then((admin) => {
            res.status(200).json({ admin, message: 'Admin registered successfully' });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

// Admin Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    adminModel.login(email, password)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

module.exports = router;
