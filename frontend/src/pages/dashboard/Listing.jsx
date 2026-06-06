import { useEffect, useState } from "react";
import { useListingStore } from "../../stores/useListingStore";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircle, Star } from "lucide-react";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import { useAuthStore } from "../../stores/useAuthStore";
import { useHostStore } from "../../stores/useHostStore";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ListingHost from "../../components/listings/ListingHost";
import ListingReserve from "../../components/listings/ListingReserve";
import AlertModal from "../../components/modals/AlertModal";
import AboutReviews from "../../components/reviews/AboutReviews";

export default function Listing() {
    const { 
        singleListing, 
        getListing, 
        singleListingLoading, 
        clearSingleListing,
        deleteListingLoading,
        deleteListing
    } = useListingStore();

    const { authUser } = useAuthStore();
    const { hostStats, getHostStats } = useHostStore();
    const activeCurrency = useActiveCurrency();

    const stats = hostStats[singleListing?.owner?._id] || {
        totalListings: 0,
        totalReviews: 0,
        averageRating: "0.0"
    };

    const isOwner = singleListing?.owner?._id === authUser?._id;

    const { listingId } = useParams();
    const [reserved, setReserved] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getListing(listingId);

        return () => clearSingleListing();
    }, [listingId, getListing, clearSingleListing]);

    useEffect(() => {
        if (!singleListing?.owner?._id) return;

        getHostStats(singleListing.owner._id);
    }, [singleListing?.owner?._id, getHostStats]);

    const handleReserve = () => {
        setReserved(false);
        setShowAlert(false);
    };

    const handleDelete = async () => {
        try {
            await deleteListing(singleListing?._id);
            navigate("/");
            toast.success("Listing deleted successfully!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to delete listing");
        }
    };

    return (
        <DashboardLayout>
            <div className="flex justify-center">
                {singleListingLoading ? (
                    <div className="flex items-center justify-center">
                        <LoaderCircle size={35} className="animate-spin" />
                    </div>
                ) : (
                    <div className="w-full max-w-5xl space-y-6">
                        <p className="text-4xl font-[Ramabhadra]">{singleListing?.title}</p>
                        <img 
                            src={singleListing?.image} 
                            alt={singleListing?.title} 
                            className="w-full rounded-2xl shadow-md object-cover"
                        />

                        <div className="flex flex-col lg:flex-row gap-10">
                            <div className="flex-1 space-y-2">
                                <p className="text-2xl">{singleListing?.description}</p>
                                <p className="text-xl">{singleListing?.location} - {singleListing?.country}</p>
                                <p className="text-lg font-[Ramabhadra] flex items-center gap-1">
                                    <Star size={12} />
                                    {stats.averageRating || "0.0"}
                                </p>
                            </div>

                            <ListingReserve 
                                isOwner={isOwner}
                                listing={singleListing}
                                reserved={reserved}
                                setReserved={setReserved}
                                setShowModal={setShowAlert}
                                userCurrency={activeCurrency.code}
                            />
                        </div>

                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                        <ListingHost owner={singleListing?.owner} />

                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                        <AboutReviews 
                            user={authUser}
                            listing={singleListing}
                            averageRating={stats.averageRating || "0.0"}
                            totalReviews={stats.totalReviews || 0}
                        />

                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                    </div>
                )}

                <AlertModal 
                    isOpen={showAlert}
                    content={isOwner
                        ? "You want to delete your listing."
                        : "You want to cancel your reservation."
                    }
                    onConfirm={isOwner ? handleDelete : handleReserve}
                    onCancel={() => setShowAlert(false)}
                    loading={deleteListingLoading}
                />
            </div>
        </DashboardLayout>
    );
}