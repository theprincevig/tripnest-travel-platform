import { Loader, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useReviewStore } from "../../stores/useReviewStore";
import { useNavigate } from "react-router-dom";
import { getTimeAgo } from "../../lib/helper";
import { hasErrors, validateReview } from "../../errors/newErrors";
import toast from "react-hot-toast";

import UserImageCard from "../cards/UserImageCard";
import TextArea from "../inputs/TextArea";
import RatingStar from "../RatingStar";

export default function ReviewModal({ isOpen, onClose, user, listing, averageRating }) {
    const initData = {
        rating: 0.0,
        comment: ""
    }
    
    const { createReview, createReviewLoading } = useReviewStore();
    const [showModal, setShowModal] = useState(isOpen);
    const [reviewData, setReviewData] = useState(initData);
    const [errors, setErrors] = useState({ rating: "", comment: "" });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleChange = (field) => (value) => {
        setReviewData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            return navigate("/login");
        }
        
        const newErrors = validateReview(reviewData);
        if (hasErrors(newErrors)) return setErrors(newErrors);
        
        try {
            const res = await createReview(
                listing?._id,
                listing.owner?._id,
                reviewData
            );
            
            setReviewData(initData);
            onClose();
            toast.success("Review created successfully!");
            
        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to create review");
        }
    };

    if (!showModal) return null;
    
    return createPortal(
        <div 
            onClick={onClose}
            className={`
                fixed inset-0 flex justify-center items-center 
                bg-black/30 z-2000 
                transition-opacity duration-300 
                ${isOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative w-full max-w-xl bg-white 
                    flex flex-col rounded-4xl shadow-xl px-4 py-3  
                    ${isOpen ? "open" : "close"}
                `}
            >
                <div className="flex items-center justify-end mb-4">
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-zinc-100 transition-all duration-200 cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="flex flex-col justify-center">
                    <h2 className="flex items-center justify-start gap-1 text-6xl font-[Ramabhadra] p-2">
                        <Star size={30} />
                        {averageRating}
                    </h2>

                    <div className="flex justify-start items-center gap-3 px-3 py-2 mb-2">
                        <UserImageCard 
                            width="w-12"
                            iconSize={15}
                            picture={user?.picture}
                        />

                        <div className="flex flex-col items-start justify-center">
                            <p className="text-lg">{user?.username}</p>
                            <p className="text-xs text-zinc-500">
                                {getTimeAgo(user?.createdAt, false)} on tripnest
                            </p>
                        </div>
                    </div>

                    <form 
                        onSubmit={handleReviewSubmit}
                        className="text-center space-y-2"
                    >
                        <RatingStar 
                            maxWidth={100}
                            value={reviewData.rating}
                            onChange={handleChange("rating")}
                            error={errors.rating}
                        />

                        <TextArea 
                            id="review"
                            rows={8}
                            value={reviewData.comment}
                            placeholder="type your review..."
                            onChange={handleChange("comment")}
                            error={errors.comment}
                        />

                        <button 
                            type="submit"
                            className="primary-btn"
                            disabled={createReviewLoading}
                        >
                            {createReviewLoading ? <Loader size={16} className="animate-spin" /> : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}