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
            {isSearchVisible && host ? (
                <Link 
                    to="/new"
                    className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all duration-200 cursor-pointer"
                >
                    <Plus size={16} />
                    <span className="">Create own Listings</span>
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
                    className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all duration-200 cursor-pointer"
                >
                    <Plane size={16} />
                    <span className="">My trips</span>
                </button>
            )}

            <MyTripModal 
                isOpen={myTripModal}
                onClose={() => setMyTripModal(false)}
            />
        </>
    );
}