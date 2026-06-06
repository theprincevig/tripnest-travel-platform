import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useExchangeRateStore = create((set, get) => ({
    rates: {},
    lastUpdated: null,
    isFetchingRates: false,

    fetchRates: async () => {
        const { lastUpdated, isFetchingRates } = get();
        const ONE_HOUR = 1000 * 60 * 60;

        // Prevent duplicate requests
        if (isFetchingRates) return;

        // Use cached data for 1hr
        if (lastUpdated && Date.now() - lastUpdated < ONE_HOUR) return;

        set({ isFetchingRates: true });
        try {
            const res = await axiosInstance.get(API_PATHS.RATES.EXCHANGE);
            const { rates } = res.data;

            set({
                rates,
                lastUpdated: Date.now()
            });

        } catch (error) {
            console.error("Fetch exchange rates error:", error);
            throw error.response?.data || error;

        } finally {
            set({ isFetchingRates: false });
        }
    }
}));