export default function ReviewSkeleton({ reviews = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {reviews.map((_, idx) => (
                <li 
                    key={idx}
                    className="flex-1 h-50 space-y-2 animate-pulse"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full shimmer" />
                        
                        <div className="flex flex-col items-start justify-center gap-1">
                            <div className="w-15 h-5 shimmer" />
                            <div className="w-20 h-3 shimmer" />
                        </div>
                    </div>

                    <div className="w-[80%] h-30 ml-1 shimmer" />
                </li>
            ))}
        </div>
    );
}