export const getTimeAgo = (date, withAgo = true) => {
    if (!date) return "";

    const now = new Date();
    const createdAt = new Date(date);

    const seconds = Math.floor((now - createdAt) / 1000);

    const intervals = [
        { label: "year", seconds: "31536000" },
        { label: "month", seconds: "2592000" },
        { label: "week", seconds: "604800" },
        { label: "day", seconds: "86400" },
        { label: "hr", seconds: "3600" },
        { label: "min", seconds: "60" }
    ];

    for (const interval of intervals) {
        const count = Math.floor(
            seconds / interval.seconds
        );

        if (count >= 1) {
            const plural = 
                count > 1 && 
                interval.label !== "hr" && 
                interval.label !== "min" 
                    ? "s"
                    : "";

            return `${count} ${interval.label}${plural}${
                withAgo ? " ago" : ""
            }`;
        }
    }
    return withAgo ? "now" : "recently joined";
};