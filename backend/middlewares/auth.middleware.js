const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

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
}