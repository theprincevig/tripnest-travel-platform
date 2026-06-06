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
                className="w-40 h-40 rounded-full shadow-xl object-cover"
            />

            {!preview ? (
                <label 
                    className="absolute bottom-0 right-5 rounded-full bg-green-500 text-white p-2 
                    hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                    <Camera size={20} />
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
                    className="absolute bottom-0 right-5 rounded-full bg-red-500 text-white p-2 
                    hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                    <Trash2 size={20} />
                </button>
            )}
        </div>
    );
}