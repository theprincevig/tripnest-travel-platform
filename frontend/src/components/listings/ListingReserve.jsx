import { HatGlasses, Pencil, Trash2 } from "lucide-react";
import { useExchangeRateStore } from "../../stores/useExchangeRateStore";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

export default function ListingReserve({ isOwner, listing, reserved, setReserved, setShowModal, userCurrency }) {
    const { rates, isFetchingRates } = useExchangeRateStore();

    return (
        <div 
            className="sticky top-24 w-full sm:max-w-sm flex flex-col items-center bg-white border border-zinc-200  
            px-2 py-4 rounded-3xl shadow-lg space-y-4"
        >
            <div className="flex items-end gap-1">
                <p className="text-2xl font-[Ramabhadra]">
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
                <span className="text-sm text-zinc-600">
                    / night
                </span>
            </div>
            {isOwner ? (
                <>
                    <Link 
                        to={`/listings/${listing?._id}/edit`}
                        className="w-full flex items-center justify-center gap-1 py-2 rounded-xl 
                        text-lg text-white bg-primary hover:bg-blue-600 
                        transition-all duration-200 cursor-pointer"
                    >
                        Edit Listing <Pencil size={18} />
                    </Link>
                    <button 
                        onClick={() => setShowModal(true)}
                        className={`
                            w-full flex items-center justify-center gap-1 py-2 
                            rounded-xl text-white text-lg font-[Ramabhadra]  
                            bg-red-500 hover:bg-red-600
                            transition-all duration-200 cursor-pointer 
                        `}
                    >
                        Delete Listing <Trash2 size={18} />
                    </button>
                    <p className="flex items-center text-sm text-zinc-500"><HatGlasses size={13} />host</p>
                </>
            ) : (
                <>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="w-full text-sm py-3 rounded-xl bg-zinc-100 
                        hover:bg-zinc-200 transition-all duration-200 
                        disabled:opacity-50 disabled:hover:bg-zinc-100"
                        disabled={!reserved}
                    >
                        Free cancellation before{" "}
                        <span className="font-semibold">24hrs</span>
                    </button>
                    <button 
                        onClick={() => setReserved(true)}
                        className={`
                            w-full py-2 rounded-xl font-[Ramabhadra] text-lg
                            border-2 transition-all duration-200 cursor-pointer 
                            ${reserved 
                                ? "bg-transparent text-green-500 border-green-400" 
                                : "bg-green-500 text-white border-green-500 hover:opacity-90"
                            }
                        `}
                        disabled={reserved}
                    >
                        {reserved ? "Reserved" : "Reserve"}
                    </button>
                    <p className="text-xs text-zinc-500">You won't be charged yet.</p>
                </>
            )}
        </div>
    );
}