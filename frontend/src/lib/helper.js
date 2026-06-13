export const getTimeAgo = (date, withAgo = true) => {
    if (!date) return "";

    const now = new Date();
    const createdAt = new Date(date);

    const seconds = Math.floor((now - createdAt) / 1000);

    const intervals = [
        { label: "year", seconds: "31536000" },
        { label: "month", seconds: "2592000" },
        { label: "week", seconds: "604800" },
        { label: "day", seconds: "86400" },
        { label: "hr", seconds: "3600" },
        { label: "min", seconds: "60" }
    ];

    for (const interval of intervals) {
        const count = Math.floor(
            seconds / interval.seconds
        );

        if (count >= 1) {
            const plural = 
                count > 1 && 
                interval.label !== "hr" && 
                interval.label !== "min" 
                    ? "s"
                    : "";

            return `${count} ${interval.label}${plural}${
                withAgo ? " ago" : ""
            }`;
        }
    }
    return withAgo ? "now" : "recently joined";
};

// Create helper function for listing's stats
export const listingStats = (listing) => {
    const reviews = listing?.reviews ?? [];
    const totalReviews = reviews.length;

    const averageRating = 
        totalReviews === 0 
            ? "0.0" 
            : (
                reviews.reduce(
                    (sum, review) => sum + review.rating, 0) / 
                    totalReviews
            ).toFixed(1);

    return {
        totalReviews,
        averageRating
    };
};

export const getReservationStatus = (status, checkIn, checkOut) => {
    if (status === "cancelled") {
        return {
            label: "Cancelled",
            className: "text-red-500",
        };
    }

    if (status === "completed") {
        return {
            label: "Completed",
            className: "text-zinc-600",
        };
    }

    // Status === "comfirmed"
    const now = new Date();
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (now < start) {
        return {
            label: "Upcoming",
            className: "text-primary"
        };
    }

    if (now >= start && now <= end) {
        return {
            label: "Ongoing",
            className: "text-green-500"
        };
    }

    // Safety fallback in case a past reservation
    // hasn't yet been marked as completed
    return {
        label: "Completed",
        className: "text-zinc-600"
    };
};