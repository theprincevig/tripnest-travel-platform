const axios = require('axios');

module.exports.fetchExchangeRate = async () => {
    try {
        const response = await axios.get("https://api.frankfurter.app/latest?from=INR",{
                timeout: 15000
        });

        return response.data;

    } catch (error) {
        console.error("Axios exchange API error:", error.message);
        throw new Error("Failed to fetch exchange rates");
    }
};