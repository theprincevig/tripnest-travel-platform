const categories = [
    "beach",
    "mountain",
    "city",
    "cabin",
    "hotel",
    "villa",
    "camping",
    "apartment"
];

export default function ListingCategory({ label, value, onChange, error }) {
    return (
        <div className="relative text-left mb-5">
            <label className="text-sm text-slate-800 ml-2">{ label }</label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        type="button"
                        onClick={() => onChange(cat)}
                        className={` 
                            px-3 py-2 rounded-xl border text-sm capitalize transition-all cursor-pointer 
                            ${
                                value === cat 
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-blue-50 border-slate-200 hover:bg-blue-100"
                            }
                            ${error ? "bg-red-50 border-red-200" : "bg-blue-50 border-slate-200"}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {error && <p className="absolute -bottom-4 left-4 text-red-500 text-xs">{error}</p>}
        </div>
    );
}