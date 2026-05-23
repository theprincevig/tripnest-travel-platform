import { currencyConfig } from "../configs/currency.config";
import { useAuthStore } from "../stores/useAuthStore";
import { useCurrencyStore } from "../stores/useCurrencyStore";

export const useActiveCurrency = () => {
    const authUser = useAuthStore((state) => state.authUser);
    const guestCurrency = useCurrencyStore((state) => state.currency);

    const activeCurrency = authUser?.currency || guestCurrency || "INR";

    return {
        code: activeCurrency,
        details: currencyConfig[activeCurrency]
    };
}