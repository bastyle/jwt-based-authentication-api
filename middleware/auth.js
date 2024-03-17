
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authentication
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        req.user = decoded.userId; // Store user ID in request object (adjust based on your JWT structure)
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};