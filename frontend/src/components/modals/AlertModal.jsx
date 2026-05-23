import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function AlertModal({ isOpen, content, onCancel, onConfirm, loading }) {
    const [showModal, setShowModal] = useState(isOpen);

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

    return (
        <div 
            onClick={onCancel}
            className={`
                fixed inset-0 flex justify-center items-center 
                bg-black/20 backdrop-blur-sm z-2000 
                transition-opacity duration-300 
                ${isOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`
                    w-full max-w-xs flex flex-col justify-center items-center 
                    bg-white rounded-3xl shadow-2xl inset-shadow-2xs 
                    py-6 px-4 space-y-2 
                    ${isOpen ? "open-alert" : "close-alert"}
                `}
            >
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-[Ramabhadra] ">Are You Sure?!</h3>
                    <p className="text-sm text-zinc-700">{content}</p>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                    <button 
                        onClick={onConfirm}
                        className="primary-btn"
                        disabled={loading}
                    >
                        {loading 
                            ? <span className="inline-block">
                                <Loader size={18} className="animate-spin" />
                            </span> 
                            : "Confirm"
                        }
                    </button>
                    <button 
                        onClick={onCancel}
                        className="error-btn"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}