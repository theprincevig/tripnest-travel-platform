const mongoose = require("mongoose");
const { cloudinary } = require("../configs/cloud.config");
const User = require("../models/user.model.js");
const Listing = require("../models/listing.model.js");
const Review = require("../models/review.model.js");
const currencyConfig = require("../configs/currency.config.js");

// -------------------
// HELPER
// -------------------
const SAFE_FIELDS = "username fullName dob phone gender address picture role currency hostProfile";

const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) return;

    const publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

    await cloudinary.uploader.destroy(publicId);
};

const applyProfileUpdates = async (user, profileData, req) => {
    const {
        username,
        picture,
        fullName,
        dob,
        phone,
        gender,
        address,
        hostProfile
    } = profileData;

    // Username
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

    // Fullname
    if (fullName) {
        user.fullName = {
            firstName: fullName.firstName || user.fullName?.firstName,
            lastName: fullName.lastName || user.fullName?.lastName,
        };
    }

    // Basic profile
    if (dob !== undefined) user.dob = dob;
    if (phone !== undefined) user.phone = phone;
    if (gender !== undefined) user.gender = gender;

    // Address
    if (address) {
        user.address = {
            city: address.city || user.address?.city,
            state: address.state || user.address?.state,
            country: address.country || user.address?.country,
        };
    }

    // Host-only fields
    if (user.role === "host" && hostProfile) {
        if (hostProfile.about !== undefined) {
            user.hostProfile.about = hostProfile.about;
        }

        if (hostProfile.languages !== undefined) {
            user.hostProfile.languages = hostProfile.languages;
        }
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
    const profileData = JSON.parse(req.body.profileData);

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        await applyProfileUpdates(user, profileData, req);
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

module.exports.hostStats = async (req, res) => {
    const { hostId } = req.params;

    try {
        const listings = await Listing.find({ owner: hostId });

        const listingIds = listings.map(
            (listing) => listing._id
        );

        const reviews = await Review.find({
            listing: { $in: listingIds }
        });

        const totalListings = listings.length;
        const totalReviews = reviews.length;

        const averageRating = 
            totalReviews > 0 
                ? (
                    reviews.reduce(
                        (acc, review) => 
                            acc + review.rating,
                        0
                    ) / totalReviews
                ).toFixed(1)
                : "0.0";

        return res.status(200).json({
            success: true,
            stats: {
                totalListings,
                totalReviews,
                averageRating
            }
        });
    } catch (error) {
        console.error("Host stats Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};