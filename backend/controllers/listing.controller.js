const Listing = require("../models/listing.model.js");
const { applyListingUpdates, deleteListingImage } = require("../utils/listing.helper.js");

module.exports.getAllListings = async (req, res) => {
    try {
        const {
            category,
            search,
            minPrice,
            maxPrice,
            page = 1,
            limit = 8,
            sort,
            owner
        } = req.query;

        let query = {};

        // Category filter
        if (category) {
            query.category = category;
        }

        // Search filter
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
            ];
        }

        // Price filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // My listings filter
        if (owner === "me" && req.user) {
            query.owner = req.user._id;
        }

        // Pagination
        const skip = (Number(page) -1) * Number(limit);

        // Sorting
        let sortOptions = {};
        if (sort === "price-asc") sortOptions.price = 1;
        if (sort === "price-desc") sortOptions.price = -1;
        if (sort === "newest") sortOptions.createdAt = -1;

        const listings = await Listing.find(query)
            .populate("owner", "username")
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const totalListings = await Listing.countDocuments(query);

        return res.status(200).json({
            success: true,
            totalListings,
            currentPage: Number(page),
            totalPages: Math.ceil(totalListings / limit),
            listings
        });
    } catch (error) {
        console.error("Get all Listings Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.getListing = async (req, res) => {
    const { listingId } = req.params;

    try {
        const listing = await Listing.findById(listingId)
            .populate("owner", "username")
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                    select: "username"
                }
            });

        if (!listing) return res.status(404).json({ success: false, error: "Listing not found" });

        return res.status(200).json({
            success: true,
            listing
        });
    } catch (error) {
        console.error("Get Listing Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.createListing = async (req, res) => {
    const userId = req.user._id;
    const imageUrl = req.file ? req.file.path : "";

    try {
        const newListing = new Listing({
            ...req.body,
            image: imageUrl,
            owner: userId
        });

        const savedListing = await newListing.save();

        return res.status(200).json({
            success: true,
            message: "Listing created successfully!",
            listing: savedListing
        });
    } catch (error) {
        console.error("Create Listing Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.updateListing = async (req, res) => {
    const { listingId } = req.params;

    try {
        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).json({ success: false, error: "Listing not found" });

        await applyListingUpdates(listing, req);
        await listing.save();

        return res.status(200).json({
            success: true,
            message: "Listing updated successfully!",
            listing
        });
    } catch (error) {
        console.error("Update Listing Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.deleteListing = async (req, res) => {
    const { listingId } = req.params;

    try {
        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).json({ success: false, error: "Listing not found" });

        await deleteListingImage(listing);
        await listing.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Listing deleted successfully!"
        });
    } catch (error) {
        
    }
};