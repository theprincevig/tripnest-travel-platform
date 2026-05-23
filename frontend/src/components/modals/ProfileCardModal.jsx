import { HatGlasses } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { getStats } from "../../lib/helper";

import UserImageCard from "../cards/UserImageCard";
import UserAboutCard from "../cards/UserAboutCard";

export default function ProfileCardModal({ user, isOpen, onClose }) {
    const [showModal, setShowModal] = useState(isOpen);
    const stats =  getStats();

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

    if (!showModal) return null;

    return createPortal(
        <div 
            onClick={onClose}
            className={`
                fixed inset-0 flex items-center justify-center 
                bg-black/30 z-2000 
                transition-opacity duration-300 
                ${isOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <Link 
                to={`/users/${user?.username}`}
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative w-full max-w-md bg-white 
                    flex items-center justify-center rounded-3xl 
                    shadow-xl p-4 cursor-pointer
                    ${isOpen ? "open" : "close"}
                `}
            >
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-4">
                    <UserImageCard 
                        width="w-20"
                        iconSize={18}
                    />

                    <div className="">
                        <h3 className="text-xl">{user?.username}</h3>
                        <p className="flex items-center justify-center text-sm text-zinc-700">
                            {user?.role === "host" ? <HatGlasses size={12} /> : ""}
                            {user?.role}
                        </p>
                    </div>
                </div>

                <UserAboutCard 
                    reviews={stats.totalReviews}
                    ratings={stats.averageRating}
                    listings={stats.totalListings}
                />
            </Link>
        </div>,
        document.body
    );
}