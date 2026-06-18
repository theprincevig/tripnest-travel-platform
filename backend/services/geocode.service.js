const axios = require('axios');

module.exports.geocodeLocation = async (location, country) => {
    try {
        const query = encodeURIComponent(`${location}, ${country}`);

        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
            {
                headers: {
                    "User-Agent": `TripNest/1.0 (contact: ${process.env.EMAIL})`
                }
            }
        );

        if (!response.data.length) {
            return {
                lat: null,
                lng: null,
            };
        }

        return {
            lat: Number(response.data[0].lat),
            lng: Number(response.data[0].lon),
        };
    } catch (error) {
        console.error("Geocoding error:", error.message);
        return {
            lat: null,
            lng: null
        };
    }
};