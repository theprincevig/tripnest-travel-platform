import { Check } from "lucide-react";

export default function UsernameEditor({
    data,
    error,
    handleChange
}) {
    return (
        <div 
            className={`
                relative w-[25%] flex items-center justify-between border-2 rounded-xl shadow-md px-2 py-2 
                active:scale-98 transition-all duration-200 
                ${error 
                    ? "border-red-200 bg-red-50" 
                    : "border-transparent bg-white"
                }`
            }
        >
            <input 
                type="text"
                value={data.username}
                placeholder="username"
                onChange={handleChange("username")}
                className={`
                    w-full px-1 text-xl outline-none
                `}
            />

            {error && <p className="absolute -bottom-5 left-2 text-red-500 text-xs">{error}</p>}
        </div>
    );
}