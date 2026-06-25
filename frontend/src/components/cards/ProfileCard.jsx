import { useEffect } from "react";
import { useHostStore } from "../../stores/useHostStore";
import { HatGlasses } from "lucide-react";
import { Link } from "react-router-dom";

import UserImageCard from "./UserImageCard";
import UserAboutCard from "./UserAboutCard";

export default function ProfileCard({ user }) {
    const { hostStats, getHostStats } = useHostStore();
    const stats = hostStats[user?._id] || {
        totalListings: 0,
        totalReviews: 0,
        averageRating: "0.0"
    };

    useEffect(() => {
        if (!user?._id) return;

        if (hostStats[user?._id]) return;

        getHostStats(user._id);
    }, [user?._id, hostStats, getHostStats]);

    return (
        <Link 
            to={`/users/${user?.username}`}
            className="w-full flex items-center"
        >
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-4">
                <UserImageCard 
                    style="w-20 h-20"
                    iconSize={18}
                    role={user?.role}
                    picture={user?.picture}
                />

                <div className="">
                    <h3 className="text-xl">{user?.username}</h3>
                    <p className="flex items-center justify-center font-[Mulish] font-semibold text-sm text-zinc-700">
                        {user?.role === "host" ? <HatGlasses size={12} /> : ""}
                        {user?.role}
                    </p>
                </div>
            </div>

            {user?.role === "host" && (
                <UserAboutCard 
                    reviews={stats.totalReviews || 0}
                    ratings={stats.averageRating || "0.0"}
                    listings={stats.totalListings || 0}
                />
            )}
        </Link>
    );
}