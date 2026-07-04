import { Link } from "react-router-dom";
import { useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { useExchangeRateStore } from "../../stores/useExchangeRateStore";
import { useReservationStore } from "../../stores/useReservationStore";
import toast from "react-hot-toast";

import OwnerCard from "../cards/OwnerCard";
import UserCard from "../cards/UserCard";
import CheckInOutCard from "../cards/CheckInOutCard";
import { getCancellationPolicy } from "../../utils/cancellationPolicy";

export default function ListingReserve({ 
    isOwner,
    listing,
    userCurrency,
    setShowModal,
    setSelectedReservation,
    setCancellationInfo
}) {
    const { rates, isFetchingRates } = useExchangeRateStore();
    const { 
        reservations,
        createReservation,
        createReservationLoading
    } = useReservationStore();

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guestsCount, setGuestsCount] = useState(1);

    const reservation = reservations.find(
        (r) => 
            r.listing?._id === listing?._id && 
            r.status === "confirmed"
    );

    const isReserved = Boolean(reservation);
    const cancellationInfo = getCancellationPolicy(reservation);

    const handleClickCancel = () => {
        if (!reservation) {
            console.log("No reservation found");
            return;
        }

        setSelectedReservation(reservation);
        setCancellationInfo(cancellationInfo);
        setShowModal(true);
    }

    const handleReserve = async () => {
        if (!checkIn || !checkOut) {
            toast.error("Please select check-in and check-out dates");
            return;
        }
        
        try {
            await createReservation(listing._id, {
                checkIn,
                checkOut,
                guestsCount
            });
            toast.success(`${listing?.title} is reserved successfully!`);

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to create reservation");
        }
    };

    return (
        <div 
            className="sticky top-24 w-full sm:max-w-sm flex flex-col bg-white border border-zinc-200  
            px-2 py-5 rounded-3xl shadow-lg space-y-4"
        >
            <div className="flex items-end gap-1 px-4 py-2">
                <p className="text-lg sm:text-2xl font-[Archivo] font-medium underline">
                    {isFetchingRates && userCurrency !== "INR" ? (
                        <span className="w-25 h-8 inline-block shimmer" />
                    ) : (
                        <>
                            {formatPrice({
                                amount: listing?.price,
                                userCurrency,
                                rates
                            })}
                        </>
                    )}
                </p>
                <span className="font-medium text-sm opacity-80">
                    / night
                </span>
            </div>

            <CheckInOutCard 
                isOwner={isOwner}
                checkIn={checkIn}
                checkOut={checkOut}
                guestsCount={guestsCount}
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                setGuestsCount={setGuestsCount}
            />

            {isOwner ? (  
                <OwnerCard 
                    listingId={listing?._id}
                    isOpen={() => setShowModal(true)}
                />
                
            ) : (
                <UserCard 
                    isOpen={handleClickCancel}
                    reserved={isReserved}
                    loading={createReservationLoading}
                    hasCancellationFee={cancellationInfo.hasCancellationFee}
                    handleReserve={handleReserve}
                />
            )}
        </div>
    );
}