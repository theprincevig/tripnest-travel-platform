import { Globe, Menu, Plus, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useListingStore } from "../../stores/useListingStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import toast from "react-hot-toast";

import SearchInput from "../inputs/SearchInput";
import CurrencyModal from "../modals/CurrencyModal";
import Modal from "../Modal";

export default function Navbar({ isSearchVisible }) {
    const { getAllListings, setFilters } = useListingStore();
    const { authUser, becomeHost } = useAuthStore();
    
    const HOST = authUser?.role === "host";

    const [value, setValue] = useState("");
    const [userModal, setUserModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (location.pathname !== "/listings") {
            navigate("/");
        }
        setFilters({ search: value });
        getAllListings({ search: value });
    }

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
            <div className="w-[95%] h-20 flex items-center justify-between">
                {/* logo section */}
                <div className="flex items-center">
                    <img 
                        src="/tripnest-logo.png" 
                        alt="tripnest-logo" 
                        onClick={() => navigate("/")}
                        className="w-40 object-cover cursor-pointer" 
                    />
                </div>

                {isSearchVisible && HOST && (
                    <div 
                        onClick={() => navigate("/new")}
                        className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all duration-200 cursor-pointer"
                    >
                        <Plus size={16} />
                        <span className="">Create own Listings</span>
                    </div>
                )}

                {/* user section */}
                <div className="flex items-center justify-end gap-4">
                    <button 
                        onClick={() => {
                            if (HOST) {
                                navigate("/my-listings");
                            } else {
                                handleHostButton();
                            }
                        }}
                        className="px-3 py-2 rounded-full text-sm opacity-80 hover:bg-zinc-200/40 transition-all cursor-pointer"
                    >
                        {HOST ? "My Listings" : "Become a host"}
                    </button>

                    <div 
                        onClick={() => setOpenModal(true)}
                        className="rounded-full p-3 bg-zinc-200/40 hover:bg-zinc-200/60 transition-all duration-200 cursor-pointer"
                    >
                        <Globe size={20} />
                    </div>

                    <div 
                        onClick={() => setUserModal(prev => !prev)}
                        className="rounded-full p-3 bg-zinc-200/40 hover:bg-zinc-200/60 transition-all duration-200 cursor-pointer"
                    >
                        <Menu size={20} />
                    </div>
                </div>
            </div>

            {/* search section */}
            {isSearchVisible && (
                <div className="w-full flex items-center justify-center h-30">
                    <SearchInput
                        icon={<Search size={22} />}
                        type="text"
                        name="search"
                        value={value}
                        placeholder="search destinations..."
                        onChange={(e) => setValue(e.target.value)}
                        handleSearch={handleSearch}
                    />
                </div>
            )}

            {userModal && 
                <Modal 
                    user={authUser} 
                    onBecomeHost={handleHostButton}
                />
            }

            <CurrencyModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
}