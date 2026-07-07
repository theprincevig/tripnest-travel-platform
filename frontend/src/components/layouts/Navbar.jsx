import { Link, useLocation, useNavigate } from "react-router-dom";
import { useListingStore } from "../../stores/useListingStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import toast from "react-hot-toast";

import SearchInput from "../inputs/SearchInput";
import NavbarMidSection from "../sections/NavbarMidSection";
import NavbarUserSection from "../sections/NavbarUserSection";
import Modal from "../Modal";

export default function Navbar({ isSearchVisible }) {
    const { 
        filters,
        getAllListings,
        setFilters,
        resetFilters,
    } = useListingStore();
    const { authUser, becomeHost } = useAuthStore();

    const [value, setValue] = useState(filters.search);
    const [userModal, setUserModal] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (location.pathname !== "/") {
            navigate("/");
        }
        setFilters({ search: value });
        getAllListings({ search: value });
    }

    const handleClearSearch = () => {
        setValue("");
        resetFilters();
        getAllListings();
    };

    const handleHostButton = async () => {
        if (!authUser) {
            return navigate("/login");
        }

        try {
            await becomeHost();
            toast.success("You're become a host now!");

        } catch (error) {
            console.error(error.message);
            toast.error(error.response?.data?.message || "Failed to become host.");
        }
    }

    return (
        <div className="sticky top-0 w-full flex flex-col items-center border-b-2 border-zinc-200/50 bg-zinc-100/30 backdrop-blur-md p-2 z-1000">
            <div className="w-[95%] h-16 sm:h-18 md:h-20 flex items-center justify-between gap-2">
                {/* logo section */}
                <div className="flex items-center">
                    <img 
                        src="/tripnest-logo.png" 
                        alt="tripnest-logo" 
                        onClick={() => navigate("/")}
                        className="h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 w-auto max-w-full object-contain cursor-pointer shrink-0" 
                    />
                </div>

                <NavbarMidSection 
                    user={authUser}
                    host={authUser?.role === "host"}
                    navigate={navigate}
                    isSearchVisible={isSearchVisible}
                />

                <NavbarUserSection 
                    host={authUser?.role === "host"}
                    navigate={navigate}
                    onBecomeHost={handleHostButton}
                    onHandleClickable={() => setUserModal(prev => !prev)}
                />
            </div>

            {/* search section */}
            {isSearchVisible && (
                <div className="w-full flex justify-center px-4 py-3">
                    <SearchInput
                        type="text"
                        name="search"
                        value={value}
                        placeholder="search destinations..."
                        onChange={(e) => setValue(e.target.value)}
                        handleSearch={handleSearch}
                        handleClear={handleClearSearch}
                    />
                </div>
            )}

            {userModal && 
                <Modal 
                    user={authUser} 
                    onBecomeHost={handleHostButton}
                />
            }
        </div>
    );
}