const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3080;

mongoose.set('strictQuery', true); // Mongoose 7+ compatibility

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/images', express.static(path.join(__dirname, 'assets/images')));

// CORS setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "*");
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', require('./routes/user.route'));
app.use('/', require('./routes/product.route'));
app.use('/admin', require('./routes/admin.route'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
