const { fetchExchangeRate } = require("../services/exchangeRate.service");

module.exports.getExchangeRate = async (req, res) => {
    try {
        const data = await fetchExchangeRate();

        res.status(200).json({
            success: true,
            rates: {
                INR: 1,
                ...data.rates
            }
        });
    } catch (error) {
        console.error("Exchange rate error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch exchange rates"
        });
    }
};