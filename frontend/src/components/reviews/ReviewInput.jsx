export default function ReviewInput({ setOpenReview }) {
    return (
        <div className="px-5 py-4 mb-8">
            <button 
                onClick={() => setOpenReview(true)}
                className="w-full border-b border-zinc-300/40 animate-pulse"
            >
                <p className="text-left text-zinc-400 mx-3 mb-1">Give your review</p>
            </button>
        </div>
    );
}