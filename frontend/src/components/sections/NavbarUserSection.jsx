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
            <div className="flex items-center justify-end gap-4">
                <button 
                    onClick={() => {
                        if (host) {
                            navigate("/my-listings");
                        } else {
                            onBecomeHost();
                        }
                    }}
                    className="px-3 py-2 rounded-full text-sm font-[Archivo] font-bold opacity-80 hover:bg-zinc-200/40 transition-all cursor-pointer"
                >
                    {host ? "My Listings" : "Become a host"}
                </button>

                <div 
                    onClick={() => setCurrencyModal(true)}
                    className="rounded-full p-3 bg-zinc-200/40 hover:bg-zinc-200/60 transition-all duration-200 cursor-pointer"
                >
                    <Globe size={20} />
                </div>

                <div 
                    onClick={onHandleClickable}
                    className="rounded-full p-3 bg-zinc-200/40 hover:bg-zinc-200/60 transition-all duration-200 cursor-pointer"
                >
                    <Menu size={20} />
                </div>
            </div>

            <CurrencyModal 
                isOpen={currencyModal}
                onClose={() => setCurrencyModal(false)}
            />
        </>
    );
}