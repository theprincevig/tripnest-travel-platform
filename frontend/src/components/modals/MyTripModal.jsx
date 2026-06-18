import { Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useReservationStore } from "../../stores/useReservationStore";
import ReservationCard from "../cards/ReservationCard";

export default function MyTripModal({ isOpen, onClose }) {
    const [showModal, setShowModal] = useState(isOpen);

    const { 
        reservations,
        getReservations,
        getReservationLoading
    } = useReservationStore();

    useEffect(() => {
        if (isOpen) {
            getReservations();
        }
    }, [isOpen]);

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
                    <h3 className="text-xl">My Trips</h3>
                    <button 
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-zinc-100 transition-all duration-200 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="border-t border-zinc-200 mb-6" />

                <div className="max-h-[70vh] overflow-y-auto space-y-4 pr-2">
                    {getReservationLoading ? (
                        <div className="h-40 flex items-center">
                            <Loader size={20} className="animate-spin mx-auto" />
                        </div>
                    ) : (
                        reservations.length === 0 ? (
                            <div className="text-center font-[Mulish] opacity-50 py-10">
                                <p className="text-xl font-bold">No trips yet</p>
                                <p className="text-sm font-semibold">
                                    Your reservations will appear here
                                </p>
                            </div>
                        ) : (
                            reservations.map((reservation) => (
                                <ReservationCard 
                                    key={reservation._id}
                                    listing={reservation.listing}
                                    reservation={reservation}
                                />
                            ))
                        )
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}