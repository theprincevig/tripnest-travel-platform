import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useReviewStore = create((set, get) => ({
    reviews: [],

    reviewsLoading: false,
    createReviewLoading: false,
    deleteReviewLoading: false,

    error: null,

    getReviews: async (listingId) => {
        set({ reviewsLoading: true, error: null });
        try {
            const res = await axiosInstance.get(API_PATHS.REVIEWS.GET_ALL(listingId));
            set({ reviews: res.data.reviews || [] });

        } catch (error) {
            console.error(`Get Reviews error: ${error}`);
            set({ reviews: [], error: error.message });
            throw error.response?.data || error;

        } finally {
            set({ reviewsLoading: false });
        }
    },

    createReview: async (listingId, data) => {
        set({ createReviewLoading: true });
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
            set({ createReviewLoading: false });
        }
    },

    deleteReview: async (listingId, reviewId) => {
        set({ deleteReviewLoading: true });
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
            set({ deleteReviewLoading: false });
        }
    },

    resetReviews: () => {
        set({ reviews: [] });
    }
}));