const jwt = require('jsonwebtoken');
require('dotenv').config();

const authAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        if (decoded.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.admin = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authAdmin;
