export default function CheckInOutCard({
    isOwner,
    checkIn,
    checkOut,
    guestsCount,
    setCheckIn,
    setCheckOut,
    setGuestsCount
}) {
    return (
        <div 
            className={`
                border border-gray-500 rounded-xl mx-4 overflow-hidden 
                ${isOwner 
                    ? "opacity-50 pointer-events-none" 
                    : "opacity-100 pointer-events-auto"
                }
            `}
        >
           <div className="flex">
                <div className="flex-1 border-r border-gray-500 p-2">
                    <p className="text-xs font-semibold uppercase">
                        Check-in
                    </p>
                    <input 
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full text-xs sm:text-sm outline-none"
                    />
                </div>

                <div className="flex-1 p-2">
                    <p className="text-xs font-semibold uppercase">
                        Check-in
                    </p>
                    <input 
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full text-xs sm:text-sm outline-none"
                    />
                </div>
           </div>
            <div className="border-t border-gray-500 p-2">
                <p className="text-xs font-semibold uppercase">
                    Guests
                </p>
                <input 
                    type="number"
                    min="1"
                    value={guestsCount}
                    onChange={(e) => 
                        setGuestsCount(Math.max(1, Number(e.target.value)))
                    }
                    className="w-full text-sm pl-4 outline-none"
                />
            </div>
        </div>
    );
}