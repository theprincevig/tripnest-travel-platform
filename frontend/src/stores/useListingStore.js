import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useListingStore = create(
    persist((set, get) => ({
        // States
        allListings: [],    // Fetch all listings in dashboard
        myListings: [], // Fetch only user's own created listings
        userListings: [],   // Fetch listings who owes it
        singleListing: null,    // Fetch single listing by using listing id

        // Loading states
        listingsLoading: false,
        singleListingLoading: false,
        createListingLoading: false,
        updateListingLoading: false,
        deleteListingLoading: false,
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

        clearSingleListing: () => set({ singleListing: null }),
        clearUserListings: () => set({ userListings: [] }),

        getAllListings: async (customFilters = {}) => {
            set({ listingsLoading: true, error: null });
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
                    allListings: listings || [],
                    totalListings,
                    currentPage: page,
                    totalPages
                });

            } catch (error) {
                console.error(`Get Listings error: ${error}`);
                set({ allListings: [], error: error.message });
                throw error.response?.data || error;

            } finally {
                set({ listingsLoading: false });
            }
        },

        getMyListings: async () => {
            set({ listingsLoading: true, error: null });
            try {
                const res = await axiosInstance.get(API_PATHS.LISTINGS.GET_ALL, {
                    params: { owner: "me" }
                });

                const {
                    listings,
                    totalListings,
                    currentPage,
                    totalPages
                } = res.data;

                set({
                    myListings: listings || [],
                    totalListings,
                    currentPage,
                    totalPages
                });

            } catch (error) {
                console.error(`Get My Listings error: ${error}`);
                set({ myListings: [], error: error.message });
                throw error.response?.data || error;

            } finally {
                set({ listingsLoading: false });
            }
        },

        getUserListings: async (ownerId) => {
            set({ listingsLoading: true, error: null });
            try {
                const res = await axiosInstance.get(API_PATHS.LISTINGS.GET_ALL, {
                    params: { owner: ownerId }
                });

                const {
                    listings,
                    totalListings,
                    currentPage,
                    totalPages
                } = res.data;

                set({
                    userListings: listings || [],
                    totalListings,
                    currentPage,
                    totalPages
                });

            } catch (error) {
                console.error(`Get User Listings error: ${error}`);
                set({ myListings: [], error: error.message });
                throw error.response?.data || error;

            } finally {
                set({ listingsLoading: false });
            }
        },

        getListing: async (listingId) => {
            set({ singleListingLoading: true, error: null });
            try {
                const res = await axiosInstance.get(API_PATHS.LISTINGS.GET_ONE(listingId));

                set({ singleListing: res.data.listing });
                return res.data.listing;

            } catch (error) {
                console.error(`Get Listing error: ${error}`);
                set({ singleListing: null, error: error.message });
                throw error.response?.data || error;

            } finally {
                set({ singleListingLoading: false });
            }
        },

        createListing: async (data) => {
            set({ createListingLoading: true });
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
                await Promise.all([
                    get().getAllListings(),
                    get().getMyListings()
                ]);
                return res.data;

            } catch (error) {
                console.error(`Create Listing error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ createListingLoading: false });
            }
        },

        updateListing: async (listingId, data) => {
            set({ updateListingLoading: true });
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
                    // Update all listings state
                    allListings: state.allListings.map((l) =>
                        l._id === listingId ? res.data.listing : l
                    ),

                    // Update my listings state
                    myListings: state.myListings.map((l) => 
                    l._id === listingId ? res.data.listing : l
                    ),

                    singleListing:
                        state.singleListing?._id === listingId
                            ? res.data.listing
                            : state.singleListing
                }));
                return res.data;

            } catch (error) {
                console.error(`Update Listing error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ updateListingLoading: false });
            }
        },

        deleteListing: async (listingId) => {
            set({ deleteListingLoading: true });
            try {
                await axiosInstance.delete(API_PATHS.LISTINGS.DELETE(listingId));

                set((state) => ({
                    // Filter all listings
                    allListings: state.allListings.filter(
                        (l) => l._id !== listingId
                    ),

                    // Filter my listings
                    myListings: state.myListings.filter(
                        (l) => l._id !== listingId
                    ),

                    singleListing:
                        state.singleListing?._id === listingId
                            ? null
                            : state.singleListing
                }));
            } catch (error) {
                console.error(`Delete Listing error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ deleteListingLoading: false });
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