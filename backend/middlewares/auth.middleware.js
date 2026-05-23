const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

// Strict auth -> User must be logged-in
// Otherwise request should fail
module.exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized, no token." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();

    } catch (error) {
        console.error("JWT token error : ", error);
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

// Create soft auth for access some features without logged-in
// Like :- All listings, posts, reviews, search, etc
module.exports.optionalAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    // No token -> continue as guest
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();

    } catch (error) {
        console.error("Optional auth error:", error);

        // Invalid token → continue as guest
        req.user = null;
        next();
    }
};