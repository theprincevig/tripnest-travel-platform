import { KeyRoundIcon, Languages, MapPin, Pencil, PhoneIncoming } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "../cards/ProfileCard";

export default function ProfileInfo({ authUser, profileUser, name, }) {
    const dob = profileUser?.dob
        ? new Date(profileUser.dob).toLocaleDateString()
        : "Not provided";

    return (
        <div className="relative flex flex-col sm:flex-row items-center gap-8 p-4">
            <div className="w-full bg-white max-w-sm rounded-3xl shadow-xl inset-shadow-2xs px-2 py-4">
                <ProfileCard user={profileUser} />
            </div>
            <div className="flex-1 font-[Mulish] flex flex-col items-start justify-center space-y-2 p-4">
                <h2 className="text-2xl sm:text-4xl font-[Archivo] font-semibold">
                    About {name}
                </h2>

                <p className="text-sm sm:text-base">Born in {dob}</p>
                
                <p className="text-sm sm:text-base flex items-center gap-1">
                    <MapPin size={14} />
                    Lives in{" "}
                    {profileUser?.address?.city}{" "}
                    {profileUser?.address?.state}{", "}
                    {profileUser?.address?.country}
                </p>

                {profileUser?.role === "host" && (
                    <>
                        <p className="text-sm sm:text-base flex items-center gap-1">
                            <Languages size={16} />
                            Languages:{" "}
                            {profileUser?.hostProfile?.languages?.join(", ")}

                        </p>
                        
                        <p className="text-sm sm:text-base flex items-center gap-2 hover:underline transition-all">
                            <PhoneIncoming size={13} />
                            Contact No.{" "}
                            {profileUser?.phone}
                        </p>
                        
                        <p className="text-sm sm:text-base font-[Poppins] mt-6">
                            {profileUser?.hostProfile?.about}
                        </p>
                    </>
                )}

                {authUser?.username === profileUser?.username && (
                    <Link
                        to="/change-password"
                        className="text-sm sm:text-base flex items-center gap-1 underline"
                    >
                        <KeyRoundIcon size={14} />
                        Change password
                    </Link>
                )}

            </div>

            {authUser?.username === profileUser?.username && (
                <Link 
                    to="/users/me"
                    className="absolute top-0 right-0 rounded-full shadow-md p-2 
                    text-white bg-primary hover:scale-110 
                    transition-all duration-300 cursor-pointer"
                >
                    <Pencil className="size-4 sm:size-5" />
                </Link>
            )}
        </div>
    );
}