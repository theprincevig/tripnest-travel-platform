import { HatGlasses, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OwnerCard({ listingId, isOpen }) {
    return (
        <>
            <Link 
                to={`/listings/${listingId}/edit`}
                className="flex items-center justify-center gap-2 primary-btn"
            >
                Edit Listing <Pencil size={18} />
            </Link>
            <button 
                onClick={isOpen}
                className="flex items-center justify-center gap-2 error-btn"
            >
                Delete Listing <Trash2 size={18} />
            </button>
            <p className="flex justify-center items-center font-[Mulish] font-semibold text-sm">
                <HatGlasses size={13} />host
            </p>
        </>
    );
}