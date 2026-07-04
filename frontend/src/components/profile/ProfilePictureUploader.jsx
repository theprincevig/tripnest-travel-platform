import { Camera, Trash2 } from "lucide-react";

export default function ProfilePictureUploader({
    preview,
    loading,
    onChangePicture,
    onRemovePicture
}) {
    return (
        <div className="relative">
            <img 
                src={preview || "/user/avatar.png"} 
                alt="user" 
                className="w-25 sm:w-40 h-25 sm:h-40 rounded-full shadow-xl object-cover"
            />

            {!preview ? (
                <label 
                    className="absolute bottom-0 right-2 sm:right-5 rounded-full bg-green-500 text-white 
                    p-1.5 sm:p-2 hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                    <Camera className="size-4 sm:size-6" />
                    <input 
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={onChangePicture}
                        disabled={loading} 
                    />
                </label>
            ) : (
                <button 
                    onClick={onRemovePicture}
                    className="absolute bottom-0 right-2 sm:right-5 rounded-full bg-red-500 text-white 
                    p-1.5 sm:p-2 hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                    <Trash2 className="size-4 sm:size-6" />
                </button>
            )}
        </div>
    );
}