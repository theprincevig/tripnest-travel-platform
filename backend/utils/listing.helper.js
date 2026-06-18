const { cloudinary } = require("../configs/cloud.config");
const { geocodeLocation } = require("../services/geocode.service");

const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) return;

    const publicId = imageUrl
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

    await cloudinary.uploader.destroy(publicId);
};

const applyListingUpdates = async (listing, req) => {
    const {
        title,
        description,
        price,
        category,
        location,
        country,
        removeImage
    } = req.body

    // Update basic fields
    if (title !== undefined) listing.title = title;
    if (description !== undefined) listing.description = description;
    if (price !== undefined) listing.price = price;
    if (category !== undefined) listing.category = category;

    // Check whether location or country changed
    const locationChanged = 
        (location !== undefined && location !== listing.location) ||
        (country !== undefined && country !== listing.country);

    if (location !== undefined) listing.location = location;
    if (country !== undefined) listing.country = country;

    // Recalculate coordinates only if needed
    if (locationChanged) {
        const coordinates = await geocodeLocation(
            listing.location,
            listing.country
        );

        if (coordinates) {
            listing.coordinates = coordinates;
        }
    }

    if (removeImage === "true") {
        await deleteFromCloudinary(listing.image);
        listing.image = "";
    }

    // New image uploaded
    if (req.file) {
        await deleteFromCloudinary(listing.image);
        listing.image = req.file.path;
    }
};

const deleteListingImage = async (listing) => {
    await deleteFromCloudinary(listing.image);
};

module.exports = { applyListingUpdates, deleteListingImage };