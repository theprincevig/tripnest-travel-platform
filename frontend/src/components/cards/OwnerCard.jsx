import { HatGlasses, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OwnerCard({ listingId, isOpen }) {
    return (
        <>
            <Link 
                to={`/listings/${listingId}/edit`}
                className="flex items-center justify-center gap-2 primary-btn"
            >
                Edit Listing <Pencil className="size-4 sm:size-5" />
            </Link>
            <button 
                onClick={isOpen}
                className="flex items-center justify-center gap-2 error-btn"
            >
                Delete Listing <Trash2 className="size-4 sm:size-5" />
            </button>
            <p className="flex justify-center items-center font-[Mulish] font-semibold text-xs sm:text-sm">
                <HatGlasses size={13} />host
            </p>
        </>
    );
}