import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrencyStore = create(
    persist(
        (set) => ({
            currency: "INR",

            setCurrency: (currency) =>
                set({ currency })
        }),
        {
            name: "currency-storage"
        }
    )
);