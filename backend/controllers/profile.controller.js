const mongoose = require("mongoose");
const { cloudinary } = require("../configs/cloud.config");
const User = require("../models/user.model.js");
const currencyConfig = require("../configs/currency.config.js");

// -------------------
// HELPER
// -------------------
const SAFE_FIELDS = "username picture role currency";

const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) return;

    const publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

    await cloudinary.uploader.destroy(publicId);
};

const applyProfileUpdates = async (user, req) => {
    const { username, picture } = req.body;

    if (username !== undefined && username !== user.username) {
        const existingUser = await User.findOne({
            username: username.toLowerCase(),
            _id: { $ne: user._id }
        });

        if (existingUser) {
            throw new Error("Username has been already taken.");
        }

        user.username = username.toLowerCase();
    }

    if (picture === "") {
        await deleteFromCloudinary(user.picture);
        user.picture = "";
    }

    if (req.file) {
        await deleteFromCloudinary(user.picture);
        user.picture = req.file.path;
    }
};

module.exports.getOwnProfile = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).select(SAFE_FIELDS);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Get own profile error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.viewProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({
            username: username.toLowerCase()
        }).select(SAFE_FIELDS);
        
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("View Profile Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.updateProfile = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        await applyProfileUpdates(user, req);
        await user.save();

        const updatedUser = await User.findById(userId).select(SAFE_FIELDS);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user: updatedUser
        });
    } catch (error) {
        console.error("Update Profile Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.becomeHost = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        user.role = "host";
        await user.save();

        return res.status(200).json({
            success: true,
            message: "You're now a host!",
        });
    } catch (error) {
        console.error("Become host Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.changeCurrency = async (req, res) => {
    const { currency } = req.body;
    const userId = req.user._id;

    if (!currency) {
        return res.status(400).json({
            success: false,
            error: "Currency is required"
        });
    }

    try {
        // Check valid currency
        if (!currencyConfig[currency]) {
            return res.status(400).json({
                success: false,
                error: "Invalid currency"
            });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        user.currency = currency;
        await user.save();

        const updatedUser = await User.findById(userId).select(SAFE_FIELDS);

        return res.status(200).json({
            success: true,
            message: "Currency updated successfully!",
            user: updatedUser
        });
        
    } catch (error) {
        console.error("Change currency Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};