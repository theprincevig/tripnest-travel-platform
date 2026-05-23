const currencyConfig = require("../configs/currency.config.js");
const User = require("../models/user.model.js");
const { verifyGoogleToken, generateGoogleUsername } = require("../services/googleAuth.service.js");
const { generateTokenAndCookie, cookieOptions } = require("../utils/generateToken.js");

const GET_SAFE = async (userId) => {
    return await User.findById(userId)
        .select("-password");
};

module.exports.session = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            success: true,
            user
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
    const { username, email, password, currency } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, error: "This email has already taken" });

        const selectedCurrency = currencyConfig[currency] ? currency : "INR";

        const user = await User.create({
            username,
            email,
            password,
            currency: selectedCurrency
        });

        GET_SAFE(user._id);
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
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    try {
        const user = await User.findOne({
            username: username.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        if (user.isGoogleUser) {
            return res.status(400).json({
                success: false,
                error: "Please continue with Google"
            });
        }

        if (!(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        generateTokenAndCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "Logged-in successfully!",
            user: {
                id: user._id,
                username: user.username,
                picture: user.picture,
                role: user.role,
                currency: user.currency
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
                username: generateGoogleUsername(googleUser.username),
                email: googleUser.email,
                picture: googleUser.picture,
                googleId: googleUser.googleId,
                isGoogleUser: true
            });
        }

        GET_SAFE(user._id);
        generateTokenAndCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "Logged-in successfully via Google!",
            user
        });
    } catch (error) {
        console.error("Google Login Error: ", error);
        return res.status(401).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt", cookieOptions);
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

        if (user.isGoogleUser) {
            return res.status(400).json({
                success: false,
                error: "Google users can't change password"
            });
        }

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