import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function RatingStar({ maxWidth, value, onChange, error, readOnly }) {
    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: `#000`,
        inactiveFillColor: `${
            error
            ? "oklch(80.8% 0.114 19.571)" 
            : "oklch(87.1% 0.006 286.286)"
        }`
    };

    return (
        <div 
            className={`
                relative flex items-center gap-1 
                ${readOnly ? "" : "ml-4 pb-2"}
            `}
        >
            <Rating 
                style={{ maxWidth: maxWidth }}
                value={value}
                itemStyles={myStyles}
                onChange={onChange}
                readOnly={readOnly}
            />
            {error && 
                <p className="absolute left-1 -bottom-2 text-red-500 text-xs">
                    {error}
                </p>
            }
        </div>
    );
}