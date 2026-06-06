import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ProfileCard from "../cards/ProfileCard";

export default function UserModal({ user, isOpen, onClose }) {
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

    return createPortal(
        <div 
            onClick={onClose}
            className={`
                fixed inset-0 flex items-center justify-center 
                bg-black/30 z-2000 
                transition-opacity duration-300 
                ${isOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`
                    w-full max-w-md bg-white 
                    flex items-center justify-center rounded-3xl 
                    shadow-xl p-4 cursor-pointer
                    ${isOpen ? "open" : "close"}
                `}
            >
                <ProfileCard user={user} />
            </div>
        </div>,
        document.body
    );
}