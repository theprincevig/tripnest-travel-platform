import { Star } from "lucide-react";

export default function UserAboutCard({ reviews, ratings, listings }) {
    return (
        <div className="w-1/3 flex flex-col gap-2 px-3 py-2">
            <div className="flex flex-col justify-center ">
                <h3 className="text-xl">{reviews}</h3>
                <p className="text-xs">Reviews</p>
            </div>

            <div className="w-full border-t border-zinc-200" />

            <div className="flex flex-col justify-center ">
                <h3 className="flex items-center text-xl">
                    {ratings}
                    <Star size={14} />
                </h3>
                <p className="text-xs">Ratings</p>
            </div>

            <div className="w-full border-t border-zinc-200" />

            <div className="flex flex-col justify-center ">
                <h3 className="text-xl">{listings}</h3>
                <p className="text-xs">Total Listings</p>
            </div>
        </div>
    );
}