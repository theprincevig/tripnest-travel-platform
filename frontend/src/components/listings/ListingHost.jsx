import { useState } from "react";

import UserModal from "../modals/UserModal";
import UserImageCard from "../cards/UserImageCard";

export default function ListingHost({ owner }) {
    const [hostModal, setHostModal] = useState(false);
    const displayName =
    `${owner?.fullName?.firstName || ""} ${owner?.fullName?.lastName || ""}`.trim() ||
    owner?.username;

    return (
        <>
            <button className="flex justify-between items-center">
                <div 
                    onClick={() => setHostModal(true)}
                    className="flex items-center gap-2"
                >
                    <UserImageCard 
                        style="w-10 sm:w-12 h-10 sm:h-12"
                        iconSize={16}
                        role={owner?.role}
                        picture={owner?.picture}
                    />
                    <p className="text-sm sm:text-lg hover:underline transition-all">hosted by {displayName}</p>
                </div>
            </button>

            <UserModal 
                user={owner}
                isOpen={hostModal}
                onClose={() => setHostModal(false)}
            />
        </>
    );
}