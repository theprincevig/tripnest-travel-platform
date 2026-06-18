import { Link } from "react-router-dom";
import { useExchangeRateStore } from "../../stores/useExchangeRateStore";
import { formatPrice } from "../../utils/formatPrice";

export default function ListingCard({ listing, userCurrency }) {
    const { rates, isFetchingRates } = useExchangeRateStore();

    return (
        <Link 
            to={`/listings/${listing._id}`}
            className="flex flex-col gap-2 cursor-pointer"
        >
            <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-full h-60 shadow-md rounded-3xl hover:scale-105 transition-all duration-200 object-cover"
            />

            <div className="flex flex-col justify-center px-2 ml-2">
                <p className="text-sm font-[Archivo] font-semibold">{listing.title} in {listing.location}</p>
                <p className="text-xs font-[Mulish] font-medium text-zinc-700">
                    {isFetchingRates && userCurrency !== "INR" ? (
                        <span className=" w-40 h-3 shimmer inline-block" />
                    ) : (
                        <>
                            {formatPrice({
                                amount: listing.price,
                                userCurrency,
                                rates
                            })} / night
                        </>
                    )}
                </p>
            </div>
        </Link>
    );
}