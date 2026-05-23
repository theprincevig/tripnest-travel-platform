module.exports.fetchExchangeRate = async () => {
    const response = await fetch("https://api.frankfurter.app/latest?from=INR");

    if (!response.ok) {
        throw new Error("Failed to fetch exchange rates.");
    }

    return response.json();
};