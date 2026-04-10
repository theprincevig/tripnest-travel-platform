import { Blocks, Menu, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useListingStore } from "../../stores/useListingStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import toast from "react-hot-toast";
import SearchInput from "../inputs/SearchInput";
import Modal from "../Modal";

export default function Navbar({ isSearchVisible }) {
    const { getAllListings, setFilters } = useListingStore();
    const { authUser, becomeHost } = useAuthStore();
    
    const [value, setValue] = useState("");
    const [userModal, setUserModal] = useState(false);
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
        <div className="sticky top-0 w-full flex flex-col border-b-2 border-black/5 bg-zinc-200/40 backdrop-blur-md p-2 z-1000">
            <div className="w-full flex items-center justify-between h-20">
                {/* logo section */}
                <div className="flex items-center">
                    <img 
                        src="/tripnest-logo.png" 
                        alt="tripnest-logo" 
                        onClick={() => navigate("/")}
                        className="w-40 object-cover ml-5 cursor-pointer" 
                    />
                </div>

                <div 
                    onClick={() => navigate("/new")}
                    className="flex items-center gap-2 text-lg p-4 hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                    <Blocks size={18} />
                    <span className="font-[Ramabhadra]">New Listing</span>
                </div>

                {/* user section */}
                <div className="flex items-center justify-end gap-4">
                    <div 
                        onClick={handleHostButton}
                        className="p-2 rounded-full text-sm opacity-70 font-[Ramabhadra] hover:bg-black/10 transition-all cursor-pointer"
                    >
                        Become a host
                    </div>
                    <div 
                        onClick={() => setUserModal(prev => !prev)}
                        className="rounded-full p-3 bg-black/5 mr-10 hover:bg-black/10 transition-all cursor-pointer"
                    >
                        <Menu size={18} />
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
        </div>
    );
}