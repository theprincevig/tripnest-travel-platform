import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircle, Star } from "lucide-react";
import toast from "react-hot-toast";

import { useListingStore } from "../../stores/useListingStore";
import { useReservationStore } from "../../stores/useReservationStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import { initialCancellationData } from "../../constants/initialData";
import { listingStats } from "../../lib/helper";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ListingHost from "../../components/listings/ListingHost";
import ListingReserve from "../../components/listings/ListingReserve";
import AboutReviews from "../../components/reviews/AboutReviews";
import AlertModal from "../../components/modals/AlertModal";
import ListingMap from "../../components/map/ListingMap";

export default function Listing() {
    const { 
        singleListing, 
        getListing, 
        singleListingLoading, 
        clearSingleListing,
        deleteListingLoading,
        deleteListing
    } = useListingStore();
    
    const { 
        getReservations,
        cancelReservation,
        cancelReservationLoading 
    } = useReservationStore();

    const { authUser } = useAuthStore();
    const activeCurrency = useActiveCurrency();

    const { listingId } = useParams();
    const navigate = useNavigate();
    
    const [showAlert, setShowAlert] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [cancellationInfo, setCancellationInfo] = useState(initialCancellationData);

    const stats = listingStats(singleListing);
    const isOwner = singleListing?.owner?._id === authUser?._id;

    useEffect(() => {
        getListing(listingId);

        return () => clearSingleListing();
    }, [listingId, getListing, clearSingleListing]);

    useEffect(() => {
        getReservations();
    }, [getReservations]);

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

    const handleCancellation = async () => {
        if (!selectedReservation) return;
        try {
            await cancelReservation(
                listingId,
                selectedReservation._id
            );

            toast.success("Reservation cancelled!");
            setShowAlert(false);
            setSelectedReservation(null);

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to cancel reservation");
        }
    };

    return (
        <DashboardLayout>
            <div className="flex justify-center">
                {singleListingLoading ? (
                    <LoaderCircle size={35} className="animate-spin" />
                ) : (
                    <div className="w-full max-w-5xl space-y-6">
                        <p className="text-4xl font-[Archivo] font-bold">{singleListing?.title}</p>
                        <img 
                            src={singleListing?.image} 
                            alt={singleListing?.title} 
                            className="w-full rounded-2xl shadow-md object-cover"
                        />

                        <div className="flex flex-col lg:flex-row gap-10">
                            <div className="flex-1 font-[Mulish] space-y-2">
                                <p className="text-2xl font-semibold">{singleListing?.description}</p>
                                <p className="text-xl font-medium">{singleListing?.location} - {singleListing?.country}</p>
                                <p className="text-lg font-[Archivo] font-bold flex items-center gap-1">
                                    <Star size={12} />
                                    {stats.averageRating || "0.0"}
                                </p>
                            </div>

                            <ListingReserve 
                                isOwner={isOwner}
                                listing={singleListing}
                                userCurrency={activeCurrency.code}
                                setShowModal={setShowAlert}
                                setSelectedReservation={setSelectedReservation}
                                setCancellationInfo={setCancellationInfo}
                            />
                        </div>

                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                        <ListingHost owner={singleListing?.owner} />

                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                        <AboutReviews 
                            user={authUser}
                            listing={singleListing}
                            averageRating={stats.averageRating}
                            totalReviews={stats.totalReviews}
                        />

                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                        <ListingMap listing={singleListing} />
                    </div>
                )}

                <AlertModal 
                    isOpen={showAlert}
                    content={isOwner
                        ? "You want to delete your listing."
                        : cancellationInfo.hasCancellationFee
                        ? "Cancelling this reservation will deeply a 10% fee."
                        : "This reservation can be cancelled free of charge."
                    }
                    onConfirm={isOwner ? handleDelete : handleCancellation}
                    onCancel={() => {
                        setShowAlert(false);
                        setSelectedReservation(null);
                    }}
                    loading={isOwner
                        ? deleteListingLoading
                        : cancelReservationLoading
                    }
                    hasCancellationFee={cancellationInfo.hasCancellationFee}
                    cancellationFee={cancellationInfo.cancellationFee}
                    refundAmount={cancellationInfo.refundAmount}
                />
            </div>
        </DashboardLayout>
    );
}