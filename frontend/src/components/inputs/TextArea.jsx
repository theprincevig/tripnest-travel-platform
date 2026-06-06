export default function TextArea({ id, rows, value, placeholder, onChange, error }) {
    return (
        <div className="relative text-left">
            <textarea 
                rows={rows}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={`
                    w-full rounded-xl border px-3 py-1 outline-none 
                    ${error
                        ? "bg-red-50 border-red-200" 
                        : "border-zinc-100"
                    }
                `}
            />
            {error && 
                <p className="absolute left-2 text-sm -bottom-4 text-red-500">
                    {error}
                </p>
            }
        </div>
    );
}