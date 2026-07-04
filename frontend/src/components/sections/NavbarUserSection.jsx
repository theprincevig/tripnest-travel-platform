import { Globe, Menu } from "lucide-react";
import { useState } from "react";
import CurrencyModal from "../modals/CurrencyModal";

export default function NavbarUserSection({
    host,
    navigate,
    onBecomeHost,
    onHandleClickable,
}) {
    const [currencyModal, setCurrencyModal] = useState(false);

    return (
        <>
            <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-3">
                <button 
                    onClick={() => {
                        if (host) {
                            navigate("/my-listings");
                        } else {
                            onBecomeHost();
                        }
                    }}
                    className="hidden lg:inline-flex px-4 py-2 rounded-full text-sm font-[Archivo] font-semibold opacity-80 hover:opacity-100 hover:bg-zinc-200/40 active:bg-zinc-200/60 transition-all duration-150 cursor-pointer"
                >
                    {host ? "My Listings" : "Become a host"}
                </button>

                <div 
                    onClick={() => setCurrencyModal(true)}
                    className="rounded-full p-2 sm:p-3 bg-zinc-200/40 hover:bg-zinc-200/60 active:bg-zinc-300/60 transition-all duration-200 cursor-pointer"
                >
                    <Globe size={18} />
                </div>

                <div 
                    onClick={onHandleClickable}
                    className="rounded-full p-2 sm:p-3 bg-zinc-200/40 hover:bg-zinc-200/60 active:bg-zinc-300/60 transition-all duration-200 cursor-pointer"
                >
                    <Menu size={18} />
                </div>
            </div>

            <CurrencyModal 
                isOpen={currencyModal}
                onClose={() => setCurrencyModal(false)}
            />
        </>
    );
}