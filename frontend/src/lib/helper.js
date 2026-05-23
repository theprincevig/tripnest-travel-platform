import { useAuthStore } from "../stores/useAuthStore";
import { useListingStore } from "../stores/useListingStore";
import { useReviewStore } from "../stores/useReviewStore";

export const getStats = () => {
    const { authUser } = useAuthStore();
    const { allListings } = useListingStore();
    const { reviews } = useReviewStore();

    const hostListings = allListings.filter(
        (listing) => listing.owner?._id === authUser?._id
    );

    const hostReviews = reviews.filter(
        (review) => review.owner?._id === authUser?._id
    );

    const totalListings = hostListings.length;
    const totalReviews = hostReviews.length;

    const averageRating = totalReviews > 0 ? (
        hostReviews.reduce(
            (acc, review) => acc + review.rating, 0
        ) / totalReviews
    ).toFixed(1) 
    : "0.0";

    return {
        totalListings,
        totalReviews,
        averageRating
    };
};