const User = require("../models/user.model.js");
const { verifyGoogleToken } = require("../services/googleAuth.service.js");
const { generateTokenAndCookie, cookieOptions } = require("../utils/generateToken.js");

module.exports.session = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error("Check Auth Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ success: false, error: "This email has already taken" });

        const user = await User.create({
            username,
            password
        });

        generateTokenAndCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "Registered successfully!",
            user
        });
    } catch (error) {
        console.error("Registered Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.login = async (req, res) => {
    const { username, password, redirect } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        generateTokenAndCookie(user._id, res);

        let safeRedirect = redirect || "/";

        if (!safeRedirect.startsWith("/")) {
            safeRedirect = "/";
        }

        return res.status(200).json({
            success: true,
            message: "Logged-in successfully!",
            redirect: safeRedirect,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Login Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const googleUser = await verifyGoogleToken(token);

        let user = await User.findOne({ email: googleUser.email });

        if (!user) {
            user = await User.create({
                username: googleUser.username,
                email: googleUser.email,
                picture: googleUser.picture,
                googleId: googleUser.googleId
            });
        }

        generateTokenAndCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "Logged-in successfully via Google!",
            user
        });
    } catch (error) {
        console.error("Google Login Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.cookie("jwt", "", cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });
    } catch (error) {
        console.error("Logout Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.changePassword = async (req, res) => {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            error: "Old and New password are required"
        });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return res.status(400).json({ success: false, error: "Old password is incorrect" });

        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully. Please login again!"
        });
    } catch (error) {
        console.error("Change password Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};