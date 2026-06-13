import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useReservationStore = create((set) => ({
    reservations: [],
    reserve: null,

    getReservationLoading: false,
    createReservationLoading: false,
    cancelReservationLoading: false,

    getReservations: async () => {
        set({ getReservationLoading: true });
        try {
            const res = await axiosInstance.get(
                API_PATHS.RESERVATION.GET
            );
            const { reservations } = res.data;

            set({ reservations: reservations || []});

        } catch (error) {
            console.error(`Get reservation error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ getReservationLoading: false });
        }
    },

    createReservation: async (listingId, data) => {
        set({ createReservationLoading: true });
        try {
            const res = await axiosInstance.post(
                API_PATHS.RESERVATION.CREATE(listingId),
                data
            );
            const { reservation } = res.data;

            set((state) => ({
                reservations: [
                    reservation,
                    ...state.reservations
                ],
                reserve: reservation
            }));
        } catch (error) {
            console.error(`Create reservation error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ createReservationLoading: false });
        }
    },

    cancelReservation: async (listingId, reserveId) => {
        set({ cancelReservationLoading: true });
        try {
            const res = await axiosInstance.delete(
                API_PATHS.RESERVATION.CANCEL(listingId, reserveId)
            );
            const { reservation } = res.data;

            set((state) => ({
                reservations: state.reservations.map((r) => 
                    r._id === reservation._id
                        ? reservation
                        : r
                ),
                reserve: 
                    state.reserve?._id === reservation._id
                        ? reservation
                        : state.reserve
            }));
        } catch (error) {
            console.error(`Cancel reservation error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ cancelReservationLoading: false });
        }
    },

    clearReservation: () => set({ reserve: null }),
}));