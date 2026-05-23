import { currencyConfig } from "../configs/currency.config";
import { convertPrice } from "./convertPrice";

export const formatPrice = ({
    amount,
    userCurrency,
    rates
}) => {
    const convertedAmount = convertPrice({
        amount,
        fromCurrency: "INR",
        toCurrency: userCurrency,
        rates
    });

    if (!convertedAmount) return amount;
                    
    return new Intl.NumberFormat(
        currencyConfig[userCurrency].locale,
        {
            style: "currency",
            currency: userCurrency
        }
    ).format(convertedAmount);
};