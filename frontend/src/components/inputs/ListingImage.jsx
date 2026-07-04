import { CloudUpload, Files } from "lucide-react";

export default function ListingImage({ 
    label,
    preview,
    error,
    onUpload 
}) {
    return (
        <div className="relative w-full text-left mb-5">
            <label className="text-sm text-slate-800 ml-2">{ label }</label>

            <div 
                className={`
                    relative mt-2 w-full min-h-[27dvh] rounded-xl border-2 overflow-hidden 
                    flex items-center justify-center cursor-pointer transition-all 
                    ${error ? "bg-red-50 border-red-200" : "bg-blue-50 border-slate-200"}
                `}
            >
                {preview ? (
                    <>
                        <img 
                            src={preview} 
                            alt="preview" 
                            className="w-full h-full object-cover" 
                        />

                        {/* Overlay actions */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-100 sm:opacity-0 sm:hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-all duration-200">
                            <label 
                                htmlFor="image-upload" 
                                className="flex gap-2 items-center font-[Archivo] text-white text-sm sm:text-xl cursor-pointer"
                            >
                                <Files className="size-4 sm:size-5" /> Change image
                            </label>
                        </div>
                    </>
                ) : (
                    <label 
                        htmlFor="image-upload" 
                        className="flex flex-col items-center justify-center gap-2 font-[Archivo] text-zinc-500 cursor-pointer"
                    >
                        <CloudUpload className="size-6 sm:size-8" />
                        <span className="font-semibold text-sm sm:text-xl">Click to upload</span>
                        <span className="text-[10px] sm:text-xs text-zinc-400">JPG, JPEG, PNG, WEBP up to 5MB</span>
                    </label>
                )}

                {/* Hidden input */}
                <input 
                    type="file" 
                    id="image-upload" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={onUpload}
                />
            </div>

            {error && <p className="absolute -bottom-4 left-4 text-red-500 text-xs">{error}</p>}
        </div>
    );
}