import { CircleQuestionMark } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useState } from "react";

import UserModal from "./modals/UserModal";

export default function Modal({ user, onBecomeHost }) {
    const { logout } = useAuthStore();
    const [profileModal, setProfileModal] = useState(false);
    const navigate = useNavigate();

    const handleProfileButton = () => {
        if (user && user?.role === "host") {
            setProfileModal(true);
        } else if (user && user?.role === "user") {
            navigate(`/users/${user?.username}`);
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="absolute right-18 top-20 w-full max-w-70 rounded-xl bg-white font-[Poppins] shadow-md py-4">
            <div className="flex items-center gap-4 px-4 py-2 hover:bg-zinc-100/80 cursor-pointer">
                <CircleQuestionMark size={18} />
                <span className="text-sm">Help Center</span>
            </div>

            <div className="border border-t-0 border-zinc-300 mx-4 my-2"/>

            <button 
                onClick={onBecomeHost}
                className={`
                    flex flex-col justify-center px-4 py-2 w-full text-left text-sm font-medium 
                    ${user?.role === "host" ? "disabled:opacity-50" : "hover:bg-zinc-100/80 cursor-pointer"}
                `}
                disabled={user?.role === "host"}
            >
                Become a host
                <p className="text-xs text-zinc-400">It's easy to start hosting and earn extra income.</p>
            </button>

            <div className="border border-t-0 border-zinc-300 mx-4 my-2"/>

            <button 
                onClick={handleProfileButton}
                className="w-full flex items-center gap-4 text-sm px-4 py-2 hover:bg-zinc-100/80 cursor-pointer"
            >
                {user?.role === "host" ? "About the host" : "Profile"}
            </button>

            <div className="border border-t-0 border-zinc-300 mx-4 my-2"/>

            <div className="flex flex-col justify-center">
                {!user ? (
                    <>
                        <Link 
                            to="/login" 
                            className="text-sm px-4 py-2 hover:bg-zinc-100/80"
                        >
                            Log in
                        </Link>
                        <span className="text-right mr-5">Or</span>
                        <Link 
                            to="/register" 
                            className="text-sm px-4 py-2 hover:bg-zinc-100/80"
                        >
                            Sign up
                        </Link>
                    </>
                ) : (
                    <button 
                        onClick={() => logout()} 
                        className="flex items-center text-sm px-4 py-2 hover:bg-zinc-100/80 cursor-pointer"
                    >
                        Log out
                    </button>
                )}
            </div>

            <UserModal 
                user={user}
                isOpen={profileModal}
                onClose={() => setProfileModal(false)}
            />
        </div>
    );
}