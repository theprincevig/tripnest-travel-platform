import { HatGlasses } from "lucide-react";

export default function UserImageCard({ style, iconSize, role, picture }) {
    return (
        <div className="relative">
            <img 
                src={picture || "/user/avatar.png"} 
                alt="user" 
                className={`${style} rounded-full object-cover cursor-pointer`}
            />
            
            {role === "host" && 
                <div className="absolute bottom-0 -right-1 bg-primary rounded-full p-1">
                    <HatGlasses size={iconSize} className="text-white" />
                </div>
            }
        </div>
    );
}