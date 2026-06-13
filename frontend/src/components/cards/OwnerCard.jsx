import { HatGlasses, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OwnerCard({ listingId, isOpen }) {
    return (
        <>
            <Link 
                to={`/listings/${listingId}/edit`}
                className="w-full flex items-center justify-center gap-1 py-2 rounded-xl 
                text-lg text-white bg-primary hover:bg-blue-600 
                transition-all duration-200 cursor-pointer"
            >
                Edit Listing <Pencil size={18} />
            </Link>
            <button 
                onClick={isOpen}
                className={`
                    w-full flex items-center justify-center gap-1 py-2 
                    rounded-xl text-white text-lg font-[Ramabhadra]  
                    bg-red-500 hover:bg-red-600
                    transition-all duration-200 cursor-pointer 
                `}
            >
                Delete Listing <Trash2 size={18} />
            </button>
            <p className="flex justify-center items-center text-sm">
                <HatGlasses size={13} />host
            </p>
        </>
    );
}