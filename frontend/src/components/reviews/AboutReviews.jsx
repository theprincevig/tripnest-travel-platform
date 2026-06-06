import { Dot, Star } from "lucide-react";
import { useReviewStore } from "../../stores/useReviewStore";
import { useEffect, useState } from "react";

import ReviewInput from "./ReviewInput";
import UserImageCard from "../cards/UserImageCard";
import ReviewModal from "../modals/ReviewModal";
import ReviewCard from "./ReviewCard";
import ReviewSkeleton from "../skeletons/ReviewSkeleton";

export default function AboutReviews({ user, listing, averageRating, totalReviews }) {
    const { reviews, getReviews, reviewsLoading } = useReviewStore();
    const [openReview, setOpenReview] = useState(false);
    
    useEffect(() => {
        if (!listing?._id) return;

        getReviews(listing?._id);
    }, [listing?._id, getReviews]);

    return (
        <div className="py-4">
            <h2 className="flex items-center text-2xl font-[Ramabhadra] mb-8">
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
                        <p className="text-center text-zinc-400 ">
                            No Reviews yet.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {reviews.map((review) => (
                                <ReviewCard 
                                    key={review?._id}
                                    review={review}
                                />
                            ))}
                        </div>
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