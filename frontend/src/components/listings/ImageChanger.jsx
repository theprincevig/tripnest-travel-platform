import { Images } from "lucide-react";

export default function ImageChanger({ preview, error, onUpload }) {
    return (
        <div className="relative">
            <div 
                className={`
                    relative w-full rounded-xl border-2 overflow-hidden 
                    flex items-center justify-center cursor-pointer transition-all 
                    ${error ? "border-red-400" : "border-transparent"}
                `}
            >
                {preview && (
                    <>
                        <img 
                            src={preview} 
                            alt="preview" 
                            className="w-full object-cover"
                        />

                        {/* Overlay actions */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center gap-2 transition-all duration-200">
                            <label 
                                htmlFor="image-upload" 
                                className="flex flex-col gap-2 items-center font-[Archivo] font-bold text-white text-lg sm:text-4xl cursor-pointer"
                            >
                                <p className="flex gap-2 items-center">
                                    <Images className="size-4 sm:size-6" /> Change image
                                </p>
                                <span className="text-xs sm:text-sm opacity-90">JPG, JPEG, PNG & WEBP up to 5MB</span>
                            </label>
                        </div>
                    </>
                )}

                <input 
                    type="file" 
                    id="image-upload" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={onUpload}
                />
            </div>

            {error && <p className="absolute -bottom-5 left-4 text-red-500 text-xs">{error}</p>}
        </div>
        
    );
}