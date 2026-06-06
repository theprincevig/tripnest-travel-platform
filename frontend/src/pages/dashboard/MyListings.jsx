import { useNavigate } from "react-router-dom";
import { useListingStore } from "../../stores/useListingStore";
import { useEffect } from "react";
import { FileX } from "lucide-react";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ListingCard from "../../components/listings/ListingCard";
import HomeSkeleton from "../../components/skeletons/HomeSkeleton";

export default function MyListings() {
    const { myListings, getMyListings, listingsLoading } = useListingStore();
    const activeCurrency = useActiveCurrency();
    const navigate = useNavigate();

    useEffect(() => {
        getMyListings();
    }, []);

    return (
        <DashboardLayout>
            {listingsLoading ? (
                <HomeSkeleton listings={myListings} />
            ) : (
                <>
                    {myListings.length === 0 ? (
                        <div className="w-full flex justify-center items-center text-zinc-400">
                            <div className="flex justify-center items-center gap-1">
                                <span className="text-2xl ">No Listings Found.</span>
                                <FileX size={22} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-7 gap-4">
                            {myListings.map((listing) => (
                                <ListingCard 
                                    key={listing._id}
                                    listing={listing}
                                    userCurrency={activeCurrency.code}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </DashboardLayout>
    );
}