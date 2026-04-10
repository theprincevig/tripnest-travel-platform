import { CircleQuestionMark } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function Modal({ user, onBecomeHost }) {
    const { logout } = useAuthStore();

    return (
        <div className="absolute right-18 top-20 w-full max-w-70 rounded-xl bg-white font-[Poppins] shadow-md py-4">
            <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <CircleQuestionMark size={18} />
                <span className="text-sm">Help Center</span>
            </div>

            <div className="border border-t-0 border-zinc-300 mx-4 my-2"/>

            <div 
                onClick={onBecomeHost}
                className="flex flex-col justify-center px-4 py-2 text-sm font-medium hover:bg-gray-100 cursor-pointer"
            >
                Become a host
                <p className="text-xs text-zinc-400">It's easy to start hosting and earn extra income.</p>
            </div>

            <div className="border border-t-0 border-zinc-300 mx-4 my-2"/>

            <div className="flex flex-col justify-center">
                {!user ? (
                    <>
                        <Link 
                            to="/login" 
                            className="text-sm px-4 py-2 hover:bg-gray-100"
                        >
                            Log in
                        </Link>
                        <span className="text-right mr-5">Or</span>
                        <Link 
                            to="/register" 
                            className="text-sm px-4 py-2 hover:bg-gray-100"
                        >
                            Sign up
                        </Link>
                    </>
                ) : (
                    <div 
                        onClick={() => logout()} 
                        className="text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        Log out
                    </div>
                )}
            </div>

        </div>
    );
}