import { Loader } from "lucide-react";

export default function UserCard({
    isOpen,
    reserved,
    loading,
    hasCancellationFee,
    handleReserve
}) {
    return (
        <>
            <button 
                onClick={isOpen}
                className="w-full text-xs py-3 rounded-xl bg-zinc-100 
                hover:bg-zinc-200 transition-all duration-200 
                disabled:opacity-50 disabled:hover:bg-zinc-100"
                disabled={!reserved}
            >
                {hasCancellationFee ? (
                    <>
                        Cancelling now will incur a{" "}
                        <span className="font-semibold">10% fee</span>
                    </>
                ) : (
                    <>
                        Free cancellation up to 24 hours before{" "}
                        <span className="font-semibold">Check-In</span>
                    </>
                )}
            </button>
            <button 
                onClick={handleReserve}
                className={`
                    w-full py-2 rounded-xl font-[Archivo] font-bold text-sm 
                    sm:text-lg border-2 transition-all duration-200 cursor-pointer 
                    ${reserved 
                        ? "bg-transparent text-green-500 border-green-400" 
                        : "bg-green-500 text-white border-green-500 hover:opacity-90"
                    }
                `}
                disabled={loading}
            >
                {loading ? (
                    <Loader size={18} className="animate-spin mx-auto" />
                ) : (
                    reserved ? "Reserved" : "Reserve"
                )}
            </button>
            <p className="text-xs sm:text-sm font-[Mulish] text-center">You won't be charged yet.</p>
        </>
    );
}