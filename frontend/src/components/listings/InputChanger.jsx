export default function InputChanger({
    isTextArea,
    type = "text",
    value,
    placeholder,
    onChange,
    error,
    rows,
    symbol,
    style = ""
}) {
    return (
        <div className="relative">
            {isTextArea ? (
                <textarea 
                    type={type}
                    rows={rows}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                    className={`
                        ${style}
                        rounded-xl shadow-sm inset-shadow-sm px-4 py-2 active:scale-99 transition-all outline-none 
                        ${error ? "bg-red-50 shadow-red-200 inset-shadow-red-100" : ""}
                    `}
                />
            ) : type === "Number" ? (
                <div 
                    className={`
                        ${style}
                        rounded-xl shadow-sm inset-shadow-sm px-4 py-2 active-scale-99 transition-all 
                        ${error ? "bg-red-50 shadow-red-200 inset-shadow-red-100" : ""}
                    `}
                >
                    <span className="text-base sm:text-2xl opacity-60">{symbol}</span>
                    <input 
                        type={type}
                        value={value}
                        placeholder="Change your listing's price"
                        onChange={(e) => onChange(e)}
                        className="w-full outline-none"
                    />
                    <span className="absolute right-5 bottom-2 text-xs sm:text-base opacity-40">/night</span>
                </div>
            ) : (
                <input 
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                    className={`
                        ${style}
                        rounded-xl shadow-sm inset-shadow-sm px-4 py-2 active:scale-99 transition-all outline-none 
                        ${error ? "bg-red-50 shadow-red-200 inset-shadow-red-100" : ""}
                    `}
                />
            )}

            {error && <p className="absolute -bottom-5 left-4 text-red-500 text-xs">{error}</p>}
        </div>
    );
}