export default function ProfileInput({ type, id = "", value, placeholder, onChange, error }) {
    return (
        <div className="relative">
            <input 
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`
                    w-full border-2 rounded-xl shadow-md px-3 py-2 outline-none 
                    active:scale-98 transition-all duration-200
                    ${error 
                        ? "border-red-200 bg-red-50" 
                        : "border-transparent bg-white"
                    }
                `}
            />

            {error && <p className="absolute -bottom-4 left-4 text-red-500 text-xs">{error}</p>}
        </div>
    );
}