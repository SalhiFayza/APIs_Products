const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');

router.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const { error } = userModel.registerValidationSchema.validate({ userName, email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await userModel.register(userName, email, password);
        res.status(200).json({ user, message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userModel.login(email, password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/user/delete/:id', async (req, res) => {
    try {
      const result = await userModel.deleteUserById(req.params.id);
      res.status(200).json({ message: 'User deleted', result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  router.patch('/user/edit/:id', async (req, res) => {
    try {
        const { image, userName, email, password } = req.body;

        const { error } = userModel.updateValidationSchema.validate({ image, userName, email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await userModel.updateUserById(req.params.id, image, userName, email, password);
        res.status(200).json({ message: 'User updated', result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// // Handle invalid routes
// router.all('*', (req, res) => {
//     res.status(404).json({ message: 'Invalid API endpoint in user routes' });
// });

module.exports = router;
