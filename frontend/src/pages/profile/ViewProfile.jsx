import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useListingStore } from "../../stores/useListingStore";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import { useParams } from "react-router-dom";
import { CircleSlash, Flag, Loader } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ProfileListings from "../../components/profile/ProfileListings";
import ProfileInfo from "../../components/profile/ProfileInfo";

export default function ViewProfile() {
    const { 
        authUser,
        profileUser,
        viewProfile,
        profileLoading 
    } = useAuthStore();

    const { 
        userListings,
        getUserListings,
        clearUserListings 
    } = useListingStore();
    
    const activeCurrency = useActiveCurrency();
    const { username } = useParams();

    useEffect(() => {
        if (!username) return;
        
        const fetchProfile = async () => {
            try {
                await viewProfile(username);
            } catch (error) {
                console.error(error.error);
            }
        }

        fetchProfile();
    }, [username, viewProfile]);

    useEffect(() => {
        if (!profileUser?._id) return;

        getUserListings(profileUser?._id);

        return () => clearUserListings();
    }, [profileUser?._id, getUserListings, clearUserListings]);

    const displayName =
        profileUser?.fullName?.firstName ||
        profileUser?.username ||
        "User";

    return (
        <DashboardLayout>
            <div className="flex items-center justify-center">
                {profileLoading ? (
                    <Loader size={25} className="opacity-70 animate-spin" />
                ) : (
                    <div className="w-full max-w-7xl space-y-6">
                        {!profileUser ? (
                            <p className="text-center font-[Archivo] font-bold text-xl sm:text-3xl">
                                User not found
                            </p>
                        ) : (
                            <>
                                <ProfileInfo 
                                    authUser={authUser}
                                    profileUser={profileUser}
                                    name={displayName}
                                />

                                <div className="w-full border-t border-zinc-300 text-center mt-8" />

                                {profileUser?.role === "host" && (
                                    <ProfileListings 
                                        name={displayName}
                                        listings={userListings}
                                        userCurrency={activeCurrency.code}
                                    />
                                )}

                                {authUser?.username !== profileUser?.username && (
                                    <>
                                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                                        <div className="flex flex-col items-start justify-center gap-4">
                                            <button
                                                className="flex gap-4 items-center justify-center px-2 py-3 rounded-xl hover:bg-zinc-100 transition-all cursor-pointer"
                                            >
                                                <Flag size={20} />
                                                Report {displayName}
                                            </button>
                                            <button 
                                                className="flex gap-4 items-center justify-center px-2 py-3 rounded-xl hover:bg-zinc-100 transition-all cursor-pointer"
                                            >
                                                <CircleSlash size={20} />
                                                Block {displayName}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}