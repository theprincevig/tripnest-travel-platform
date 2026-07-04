import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export default function AuthInput({ icon, type, value, label, placeholder, onChange, error }) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }


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
                <span className="text-zinc-500">{icon}</span>
                <input 
                    type={type === "password" ? showPassword ? "text" : "password" : type} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={(e) => onChange(e)}
                    className="w-full bg-transparent outline-none"
                />

                {type === "password" && (
                    <>
                        {showPassword ? (
                            <Eye 
                                size={18} 
                                className="text-base-content/40 cursor-pointer" 
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <EyeOff 
                                size={18}
                                className="text-base-content/40 cursor-pointer" 
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
            {error && <p className="absolute -bottom-4 left-4 text-red-500 text-xs">{error}</p>}
        </div>
    );
}