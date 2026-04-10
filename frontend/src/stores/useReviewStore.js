import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useReviewStore = create((set, get) => ({
    reviews: [],
    loading: false,
    error: null,

    getReviews: async (listingId) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.get(API_PATHS.REVIEWS.GET_ALL(listingId));
            set({ reviews: res.data.reviews || [] });

        } catch (error) {
            console.error(`Get Reviews error: ${error}`);
            set({ reviews: [], error: error.message });
            throw error.response?.data || error;

        } finally {
            set({ laoding: false });
        }
    },

    createReview: async (listingId, data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post(API_PATHS.REVIEWS.CREATE(listingId), data);

            set((state) => ({
                reviews: [
                    res.data.reviews,
                    ...state.reviews
                ],
            }));
            return res.data;

        } catch (error) {
            console.error(`Create Review error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ loading: false });
        }
    },

    deleteReview: async (listingId, reviewId) => {
        set({ loading: true });
        try {
            await axiosInstance.delete(API_PATHS.REVIEWS.DELETE(listingId, reviewId));
            set((state) => ({
                reviews: state.reviews.filter(
                    (r) => r._id !== reviewId
                ),
            }));
        } catch (error) {
            console.error(`Delete Review error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ loading: false });
        }
    },

    resetReviews: () => {
        set({ reviews: [] });
    }
}));