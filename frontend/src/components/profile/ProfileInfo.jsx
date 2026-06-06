import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "../cards/ProfileCard";

export default function ProfileInfo({ authUser, profileUser, name, }) {
    const dob = profileUser?.dob
        ? new Date(profileUser.dob).toLocaleDateString()
        : "Not provided";

    return (
        <div className="relative flex items-center gap-8 p-4">
            <div className="w-full bg-white max-w-sm rounded-3xl shadow-xl inset-shadow-2xs px-2 py-4">
                <ProfileCard user={profileUser} />
            </div>
            <div className="flex-1 flex flex-col items-start justify-center space-y-3 p-4">
                <h2 className="text-4xl font-semibold">
                    About {name}
                </h2>
                <p className="">Born in {dob}</p>
                <p>
                    Lives in{" "}
                    {profileUser?.address?.city}{" "}
                    {profileUser?.address?.state}{", "}
                    {profileUser?.address?.country}
                </p>

                {profileUser?.role === "host" && (
                    <>
                        <p>Contact No. {profileUser?.phone}</p>
                        <p>Languages: {profileUser?.hostProfile?.languages?.join(", ")}</p>
                        <p>{profileUser?.hostProfile?.about}</p>
                    </>
                )}
            </div>

            {authUser?.username === profileUser?.username && (
                <Link 
                    to="/users/me"
                    className="absolute top-0 right-0 rounded-full shadow-md p-2 
                    text-white bg-primary hover:scale-110 
                    transition-all duration-300 cursor-pointer"
                >
                    <Pencil size={20} />
                </Link>
            )}
        </div>
    );
}