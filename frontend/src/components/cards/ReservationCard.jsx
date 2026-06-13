import { Link } from "react-router-dom";
import { useExchangeRateStore } from "../../stores/useExchangeRateStore";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import { formatPrice } from "../../utils/formatPrice";
import { MapPinCheckInside } from "lucide-react";
import { getReservationStatus } from "../../lib/helper";

export default function ReservationCard({ listing, reservation }) {
    const { rates, isFetchingRates } = useExchangeRateStore();
    const activeCurrency = useActiveCurrency();

    const status = getReservationStatus(
        reservation.status,
        reservation.checkIn,
        reservation.checkOut
    );

    return (
        <Link 
            to={`/listings/${listing._id}`}
            className="rounded-2xl flex items-center 
            gap-2 px-3 py-2 transition-all duration-200"
        >
            <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-55 h-45 rounded-xl shadow-md object-cover"
            />

            <div className="flex-1 space-y-1 px-2 py-1">
                <div className="flex flex-col justify-center mb-2">
                    <h4 className="font-semibold text-xl">
                        {listing.title}
                    </h4>

                    <p className="flex items-center gap-1 text-sm text-zinc-600">
                        <MapPinCheckInside size={14} className="text-red-500" />
                        {listing.location},{" "}
                        {listing.country}
                    </p>
                </div>

                <p className="text-sm">
                    Guests:{" "}
                    {reservation.guestsCount}
                </p>

                <p className="text-sm">
                    Check-in:{" "}
                    {new Date(reservation.checkIn).toLocaleDateString()}
                </p>
                <p className="text-sm">
                    Check-out:{" "}
                    {new Date(reservation.checkOut).toLocaleDateString()}
                </p>

                <p className="flex items-center text-green-600 font-medium gap-1">
                    <span className="text-black opacity-95">Total:</span>
                    {isFetchingRates && activeCurrency.code !== "INR" ? (
                        <span className="w-25 h-5 inline-block shimmer" />
                    )
                    : (
                        formatPrice({
                            amount: reservation.totalPrice,
                            userCurrency: activeCurrency.code,
                            rates
                        })
                    )}
                </p>
            </div>

            <div className="flex-1">
                <p className="text-sm text-right">
                    Status:{" "}
                    <span className={`font-medium ${status.className}`}>
                        {status.label}
                    </span>
                </p>
            </div>
        </Link>
    );
}