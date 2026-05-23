export const convertPrice = ({
    amount,
    fromCurrency,
    toCurrency,
    rates
}) => {
    if (fromCurrency === toCurrency) {
        return amount;
    }

    // Convert source currency -> INR base first
    let amountInBase = amount;

    if (fromCurrency !== "INR") {
        amountInBase = amount / rates[fromCurrency];
    }

    // Convert INR -> target currency
    const convertedRate = rates[toCurrency];
    if (!convertedRate) return amount;

    return amountInBase * convertedRate;
};