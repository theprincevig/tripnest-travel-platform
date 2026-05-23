import { useExchangeRateStore } from "../../stores/useExchangeRateStore";
import { formatPrice } from "../../utils/formatPrice";

export default function ListingCard({ listing, userCurrency, onListing }) {
    const { rates, isFetchingRates } = useExchangeRateStore();

    return (
        <div 
            onClick={onListing}
            className="flex flex-col gap-2 cursor-pointer"
        >
            <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-full h-60 shadow-md rounded-3xl hover:scale-105 transition-all duration-200 object-cover"
            />

            <div className="flex flex-col justify-center px-2 ml-2">
                <p className="text-sm font-[Ramabhadra]">{listing.title} in {listing.location}</p>
                <p className="text-xs text-zinc-700">
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
        </div>
    );
}