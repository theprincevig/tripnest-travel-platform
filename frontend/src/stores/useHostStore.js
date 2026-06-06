import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useHostStore = create((set, get) => ({
    hostStats: {},
    hostStatsLoading: false,

    getHostStats: async (hostId) => {
        set({ hostStatsLoading: true });
        try {
            const res = await axiosInstance.get(API_PATHS.PROFILE.HOST_STATS(hostId));
            const { stats } = res.data;

            set((state) => ({
                hostStats: {
                    ...state.hostStats,
                    [hostId]: stats
                },
            }));

        } catch (error) {
            console.error(`Host stats error: ${error}`);
            throw error.response?.data || error;
            
        } finally {
            set({ hostStatsLoading: false });
        }
    },

    clearHostStats: () => set({ hostStats: {} }),
}));