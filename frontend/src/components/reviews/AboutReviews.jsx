import { Dot, Star } from "lucide-react";
import { useReviewStore } from "../../stores/useReviewStore";
import { useEffect, useState } from "react";

import ReviewInput from "./ReviewInput";
import UserImageCard from "../cards/UserImageCard";
import ReviewModal from "../modals/ReviewModal";
import ReviewCard from "./ReviewCard";
import ReviewSkeleton from "../skeletons/ReviewSkeleton";
import toast from "react-hot-toast";

export default function AboutReviews({ 
    user,
    listing,
    averageRating,
    totalReviews
}) {
    const { 
        reviews,
        getReviews,
        deleteReview,
        reviewsLoading
    } = useReviewStore();
    
    const [openReview, setOpenReview] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const displayedReviews = showAllReviews
        ? reviews
        : reviews.slice(0, 2);
    
    useEffect(() => {
        if (!listing?._id) return;

        getReviews(listing?._id);
    }, [listing?._id, getReviews]);

    const handleDelete = async (reviewId) => {
        try {
            await deleteReview(listing?._id, reviewId);
            toast.success("Review deleted successfully!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to delete review");
        }
    };

    return (
        <div className="py-4">
            <h2 className="flex items-center text-2xl font-[Archivo] font-semibold mb-8">
                <div className="flex items-center gap-2">
                    <Star size={20} />
                    {averageRating}
                </div>
                <Dot size={22} />
                <div className="flex items-center gap-1">
                    {totalReviews}
                    <span>reviews</span>
                </div>
            </h2>

            <ReviewInput setOpenReview={setOpenReview} />

            {reviewsLoading ? (
                <ReviewSkeleton reviews={reviews} />
            ) : (
                <>
                    {reviews.length <= 0 ? (
                        <p className="text-center font-[Mulish] font-bold text-zinc-400 ">
                            No Reviews yet
                        </p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {displayedReviews.map((review) => (
                                    <ReviewCard 
                                        key={review?._id}
                                        review={review}
                                        canDelete={user?._id === review.author._id}
                                        onDelete={() => handleDelete(review._id)}
                                    />
                                ))}
                            </div>

                            {reviews.length > 2 && (
                                <div className="flex justify-start mt-8">
                                    <button 
                                        onClick={() => setShowAllReviews(prev => !prev)}
                                        className="default-btn"
                                    >
                                        {showAllReviews ? "Show less" : "Show more"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            <ReviewModal 
                isOpen={openReview}
                onClose={() => setOpenReview(false)}
                user={user}
                listing={listing}
                averageRating={averageRating}
            />
        </div>
    );
}