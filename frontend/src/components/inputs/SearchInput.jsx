import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchInput({
    type,
    name,
    value,
    placeholder,
    onChange,
    handleSearch,
    handleClear
}) {

    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value.length > 0;

    return (
        <div 
            className="relative w-full max-w-3xl mx-auto flex items-center 
            rounded-full bg-white border border-zinc-200 shadow-lg 
            inset-shadow-sm p-2 active:scale-99 transition-all overflow-hidden"
        >
            {value && (
                <button 
                    onClick={handleClear}
                    className="absolute left-2 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer"
                >
                    <X size={22} />
                </button>
            )}
            
            <input 
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="h-full flex-1 ml-6 text-sm sm:text-base outline-none" 
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <div 
                className={`
                    flex items-center text-white rounded-full bg-blue-500 cursor-pointer 
                    transition-all duration-300 ease-in-out
                    ${isActive 
                        ? "px-3 sm:px-4 py-2 sm:py-3 gap-2" 
                        : "p-2 sm:p-3 gap-0"
                    }
                `}
                onClick={handleSearch}
            >
                {<Search size={22} />}
                <span
                    className={`
                        overflow-hidden whitespace-nowrap font-[Archivo] 
                        font-semibold transition-all duration-300 ease-in-out 
                        ${isActive ? "max-w-24 opacity-100" : "max-w-0 opacity-0"}
                    `}
                >
                    search
                </span>
            </div>
        </div>
    );
}