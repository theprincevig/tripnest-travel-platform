import { X } from "lucide-react";
import { currencyConfig } from "../../configs/currency.config";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCurrencyStore } from "../../stores/useCurrencyStore";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import { createPortal } from 'react-dom';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CurrencyModal({ isOpen, onClose }) {
    const [showModal, setShowModal] = useState(isOpen);
    const currencies = Object.values(currencyConfig);

    const { authUser, changeCurrency } = useAuthStore();
    const { setCurrency } = useCurrencyStore();
    const activeCurrency = useActiveCurrency();

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!showModal) return null;

    const handleCurrencyChange = async (currencyCode) => {
        try {
            if (authUser) {
                await changeCurrency(currencyCode);
            } else {
                await setCurrency(currencyCode);
            }

            toast.success(`Currency changed to ${currencyCode}`);
            onClose();

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to change currency");
        }
    };

    return createPortal(
        <div 
            onClick={onClose}
            className={`
                fixed inset-0 flex justify-center items-center 
                bg-black/30 z-2000 
                transition-opacity duration-300 
                ${isOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative w-full max-w-4xl bg-white 
                    flex flex-col rounded-4xl shadow-xl px-6 py-4  
                    ${isOpen ? "open" : "close"}
                `}
            >
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl">Currency</h3>
                    <button 
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-zinc-100 transition-all duration-200 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="border-t border-zinc-200 mb-6" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto">
                    {currencies.map((currency) => {
                        const isActive = activeCurrency.code === currency.code;

                        return (
                            <button
                                key={currency.code}
                                onClick={() => handleCurrencyChange(currency.code)}
                                className={`
                                    rounded-2xl px-4 py-2 text-left transition-all duration-200 cursor-pointer 
                                    ${isActive ? "border border-black" : "hover:bg-zinc-100"}
                                `}
                            >
                                <div className="flex flex-col">
                                    <h4 className="font-[Mulish] font-semibold">{currency.name}</h4>
                                    <p className="text-sm text-zinc-700">
                                        {currency.code}-{currency.symbol}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>,
        document.body
    );
}