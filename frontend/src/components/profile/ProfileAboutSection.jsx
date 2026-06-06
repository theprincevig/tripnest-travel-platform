export default function ProfileAboutSection({
    user,
    data,
    error,
    handleNestedChange
}) {
    const Host = user?.role === "host";

    return (
        <div 
            className={`
                w-full relative text-center 
                ${Host
                    ? "opacity-100"
                    : "opacity-50 pointer-events-none"
                }
            `}
        >
            <textarea 
                rows="5"
                value={data.hostProfile?.about}
                placeholder="about youself...."
                onChange={handleNestedChange("hostProfile", "about")}
                className={`
                    w-full max-w-md rounded-xl border 
                    px-3 py-2 outline-none active:scale-98 transition-all duration-200 
                    ${Host ? "shadow-md inset-shadow-2xs" : "border-zinc-200"}
                    ${error 
                        ? "bg-red-50 border-red-200" 
                        : "border-transparent bg-white"
                    }
                `}
            />

            {error && <p className="absolute left-2 text-sm -bottom-4 text-red-500">{error}</p>}
        </div>
    );
}