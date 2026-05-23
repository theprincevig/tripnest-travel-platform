import { useEffect, useState } from "react";
import { useListingStore } from "../../stores/useListingStore";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircle, Star } from "lucide-react";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import { getStats } from "../../lib/helper";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ListingHost from "../../components/listings/ListingHost";
import ListingReserve from "../../components/listings/ListingReserve";
import AlertModal from "../../components/modals/AlertModal";

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

    const activeCurrency = useActiveCurrency();
    const stats = getStats();

    const isOwner = singleListing?.owner?._id === authUser?._id;

    const { listingId } = useParams();
    const [reserved, setReserved] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getListing(listingId);

        return () => clearSingleListing();
    }, [listingId, getListing, clearSingleListing]);

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
            <div className="w-full flex justify-center">
                {singleListingLoading ? (
                    <div className="w-full flex items-center justify-center">
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
                                    {stats.averageRating}
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