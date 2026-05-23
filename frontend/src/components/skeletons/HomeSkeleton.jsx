export default function HomeSkeleton({ listings = [] }) {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-7 gap-4">
            {listings.map((_, idx) => (
                <li 
                    key={idx}
                    className="flex flex-col gap-2 animate-pulse"
                >
                    <div className="w-full h-60 rounded-3xl shimmer" />

                    <div className="flex flex-col justify-center gap-1 px-2 ml-2">
                        <div className="w-50 h-5 shimmer" />
                        <div className="w-40 h-3 shimmer" />
                    </div>
                </li>
            ))}
        </div>
    );
}