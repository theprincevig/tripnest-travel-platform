export default function ListingInput({ label, type, placeholder, value, onChange, error }) {
    return (
        <div className="relative text-left">
            <label className="text-xs sm:text-sm text-slate-800 ml-2">{ label }</label>
            <div 
                className={`
                    flex justify-between gap-3 text-xs sm:text-sm text-black rounded-xl 
                    px-4 py-3 mb-5 mt-1 border-2 outline-none
                    shadow-sm active:scale-99 transition-all duration-200
                    ${error ? "bg-red-50 border-red-200" : "bg-blue-50 border-slate-200"}
                `}
            >
                <input 
                    type={type} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={(e) => onChange(e)}
                    className="w-full bg-transparent outline-none"
                />
            </div>
            {error && <p className="absolute -bottom-4 left-4 text-red-500 text-xs">{error}</p>}
        </div>
    );
}