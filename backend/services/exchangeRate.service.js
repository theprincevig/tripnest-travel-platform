const axios = require('axios');

module.exports.fetchExchangeRate = async () => {
    try {
        const response = await axios.get("https://api.frankfurter.app/latest?from=INR",{
                timeout: 30000
        });

        return response.data;

    } catch (error) {
        console.error("Exchange API Error:");
        console.error(error.code);
        console.error(error.message);
        
        throw new Error("Failed to fetch exchange rates");
    }
};