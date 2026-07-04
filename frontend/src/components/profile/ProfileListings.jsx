import { FileX } from "lucide-react";
import ListingCard from "../listings/ListingCard";

export default function ProfileListings({ name, listings, userCurrency }) {
    return (
        <>
            <h3 className="font-medium text-xl">{name}'s listings</h3>
            {listings.length === 0 ? (
                <div className="flex justify-center items-center gap-1 opacity-60">
                    <span className="font-[Mulish] font-bold text-base sm:text-xl">No Listings Found.</span>
                    <FileX size={18} />
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 px-2 py-4">
                    {listings.map((listing) => (
                        <ListingCard 
                            key={listing._id}
                            listing={listing}
                            userCurrency={userCurrency}
                        />
                    ))}
                </div>
            )}
        </>
    );
}