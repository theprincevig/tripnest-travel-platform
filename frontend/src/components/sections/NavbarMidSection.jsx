import { Plane, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MyTripModal from "../modals/MyTripModal";

export default function NavbarMidSection({
    user,
    host,
    navigate,
    isSearchVisible
}) {
    const [myTripModal, setMyTripModal] = useState(false);

    return (
        <>
            {isSearchVisible && (
                host ? (
                    <Link 
                        to="/new"
                        className="no-bg-btn"
                    >
                        <Plus size={16} />
                        <span className="text-sm sm:text-lg">New</span>
                    </Link>
                ) : (
                    <button 
                        onClick={() => {
                            if (!user) {
                                return navigate("/login");
                            } else {
                                setMyTripModal(true);
                            }
                        }}
                        className="no-bg-btn"
                    >
                        <Plane size={16} />
                        <span className="text-sm sm:text-lg">My trips</span>
                    </button>
                )
            )}

            <MyTripModal 
                isOpen={myTripModal}
                onClose={() => setMyTripModal(false)}
            />
        </>
    );
}