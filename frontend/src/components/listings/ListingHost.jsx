import { useState } from "react";

import ProfileCardModal from "../modals/ProfileCardModal";
import UserImageCard from "../cards/UserImageCard";

export default function ListingHost({ owner }) {
    const [hostModal, setHostModal] = useState(false);    

    return (
        <>
            <button className="flex justify-between items-center">
                <div 
                    onClick={() => setHostModal(true)}
                    className="flex items-center gap-2"
                >
                    <UserImageCard 
                        width="w-12"
                        iconSize={16}
                        picture={owner?.picture}
                    />
                    <p className="text-lg hover:underline transition-all">hosted by {owner?.username}</p>
                </div>
            </button>

            <ProfileCardModal 
                user={owner}
                isOpen={hostModal}
                onClose={() => setHostModal(false)}
            />
        </>
    );
}