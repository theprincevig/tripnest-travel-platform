import { Dot, Trash } from "lucide-react";
import { getTimeAgo } from "../../lib/helper";
import { Link } from 'react-router-dom';

import UserImageCard from "../cards/UserImageCard";
import RatingStar from "../RatingStar";

export default function ReviewCard({ review, canDelete, onDelete }) {
    const displayName =
        `${review.author?.fullName?.firstName || ""} ${review.author?.fullName?.lastName || ""}`.trim() ||
        review.author?.username;
    
    return (
        <div 
            className="group relative flex-1 h-50 space-y-4"
        >
            <Link 
                to={`/users/${review.author.username}`}
                className="flex items-center gap-3"
            >
                <UserImageCard 
                    style="w-10 sm:w-12 h-10 sm:h-12"
                    iconSize={12}
                    role={review.author.role}
                    picture={review.author.picture}
                />
                
                <div className="flex flex-col items-start justify-center">
                    <p className="font-[Archivo] font-medium text-sm sm:text-lg">
                        {displayName}
                    </p>
                    <span className="text-xs font-[Mulish] font-semibold text-zinc-500">
                        {getTimeAgo(review.author.createdAt, false)} on tripnest
                    </span>
                </div>
            </Link>

            <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center gap-1">
                    <RatingStar 
                        maxWidth={70}
                        value={review?.rating}
                        readOnly={true}
                    />
                    <Dot size={10} className="text-zinc-400" />
                    <span className="text-xs sm:text-sm text-zinc-500">
                        {getTimeAgo(review.createdAt)}
                    </span>
                </div>

                <p className="text-xs sm:text-base">
                    {review.comment}
                </p>
            </div>

            {canDelete && (
                <button 
                    onClick={onDelete}
                    className="absolute top-2 right-2 rounded-full p-2 opacity-0 pointer-events-none 
                    group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-zinc-100 
                    transition-all duration-200 cursor-pointer"
                >
                    <Trash size={18} />
                </button>
            )}
        </div>
    );
}