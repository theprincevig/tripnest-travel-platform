import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useListingStore = create(
    persist((set, get) => ({
        listings: [],
        listing: null,

        loading: false,
        error: null,

        totalListings: 0,
        currentPage: 1,
        totalPages: 1,

        filters: {
            category: "",
            search: "",
            minPrice: "",
            maxPrice:"",
            sort: ""
        },

        getAllListings: async (customFilters = {}) => {
            set({ loading: true, error: null });
            try {
                const { filters, currentPage } = get();
                const query = {
                    ...filters,
                    ...customFilters,
                    page: customFilters.page || currentPage,
                };

                Object.keys(query).forEach(
                    (key) => query[key] === "" && delete query[key]
                );

                const res = await axiosInstance.get(API_PATHS.LISTINGS.GET_ALL,
                    { params: query }
                );

                const {
                    listings,
                    totalListings,
                    currentPage: page,
                    totalPages
                } = res.data;

                set({
                    listings: listings || [],
                    totalListings,
                    currentPage: page,
                    totalPages
                });

            } catch (error) {
                console.error(`Get Listings error: ${error}`);
                set({ listings: [], error: error.message });
                throw error.response?.data || error;

            } finally {
                set({ loading: false });
            }
        },

        getListing: async (listingId) => {
            set({ loading: true, error: null });
            try {
                const res = await axiosInstance.get(API_PATHS.LISTINGS.GET_ONE(listingId));

                set({ listing: res.data.listing });
                return res.data.listing;

            } catch (error) {
                console.error(`Get Listing error: ${error}`);
                set({ listing: null, error: error.message });
                throw error.response?.data || error;

            } finally {
                set({ loading: false });
            }
        },

        createListing: async (data) => {
            set({ loading: true });
            try {
                const formData = new FormData();

                Object.keys(data).forEach((key) => {
                    formData.append(key, data[key]);
                });

                const res = await axiosInstance.post(API_PATHS.LISTINGS.CREATE,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                // Refresh listings
                await get().getAllListings();
                return res.data;

            } catch (error) {
                console.error(`Create Listing error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ loading: false });
            }
        },

        updateListing: async (listingId, data) => {
            set({ loading: true });
            try {
                const formData = new FormData();

                Object.keys(data).forEach((key) => {
                    formData.append(key, data[key]);
                });

                const res = await axiosInstance.patch(
                    API_PATHS.LISTINGS.UPDATE(listingId),
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                set((state) => ({
                    listings: state.listings.map((l) =>
                        l._id === listingId ? res.data.listing : l
                    ),
                }));
                return res.data;

            } catch (error) {
                console.error(`Update Listing error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ loading: false });
            }
        },

        deleteListing: async (listingId) => {
            set({ loading: true });
            try {
                await axiosInstance.delete(API_PATHS.LISTINGS.DELETE(listingId));

                set((state) => ({
                    listings: state.listings.filter(
                        (l) => l._id !== listingId
                    ),
                }));
            } catch (error) {
                console.error(`Delete Listing error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ loading: false });
            }
        },

        setFilters: (newFilters) => {
            set((state) => ({
                filters: { ...state.filters, ...newFilters },
                currentPage: 1, // Reset page on filter change
            }));
        },

        resetFilters: () => {
            set({
                filters: {
                    category: "",
                    search: "",
                    minPrice: "",
                    maxPrice:"",
                    sort: ""
                },
                currentPage: 1
            });
        },

        setPage: (page) => {
            set({ currentPage: page });
        }
    })),
    {
        name: "listing-store",
        partialize: (state) => ({
            filters: state.filters, // Persist only filters
        }),
    }
);