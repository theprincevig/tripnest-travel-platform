import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';
import { currencyConfig } from '../configs/currency.config';

// helper function for change currency easily
const normalizeUser = (user) => {
    if (!user) return null;

    return {
        ...user,
        currencyDetails: currencyConfig[user.currency] || currencyConfig.INR
    };
};

export const useAuthStore = create(
    persist((set, get) => ({
        authUser: null,

        isCheckingAuth: false,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isResettingPassword: false,

        // =========== HELPER ============
        isAuthenticated: () => !!get().authUser,

        session: async () => {
            set({ isCheckingAuth: true });
            try {
                const res = await axiosInstance.get(API_PATHS.AUTH.SESSION);
                const { user } = res.data;

                set({ authUser: normalizeUser(user) });
                return user;

            } catch (error) {
                console.error(`Check Auth error: ${error}`);
                set({ authUser: null });
                return null;

            } finally {
                set({ isCheckingAuth: false });
            }
        },

        signup: async (data) => {
            set({ isSigningUp: true });
            try {
                const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, data);
                const { user } = res.data;

                set({ authUser: normalizeUser(user) });
                return user;

            } catch (error) {
                console.error(`Signup error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ isSigningUp: false });
            }
        },

        login: async (data) => {
            set({ isLoggingIn: true });
            try {
                const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);
                const { user } = res.data;

                set({ authUser: normalizeUser(user) });
                return user;

            } catch (error) {
                console.error(`Login error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ isLoggingIn: false });
            }
        },

        googleLogin: async (data) => {
            set({ isLoggingIn: true });
            try {
                const res = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_LOGIN, data);
                const { user, message } = res.data;
                
                set({ authUser: normalizeUser(user) });
                return { user, message };

            } catch (error) {
                console.error(`Google login error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ isLoggingIn: false });
            }
        },

        logout: async () => {
            try {
                await axiosInstance.delete(API_PATHS.AUTH.LOGOUT);
                set({ authUser: null });

            } catch (error) {
                console.error(`Logout error: ${error}`);
                throw error.response?.data || error;
            }
        },

        becomeHost: async () => {
            try {
                const res = await axiosInstance.patch(API_PATHS.PROFILE.BECOME_HOST);
                
                set((state) => ({
                    authUser: {
                        ...state.authUser,
                        role: "host"
                    },
                }));

                return res.data;

            } catch (error) {
                console.error(`Become a host error: ${error}`);
                throw error.response?.data || error;
            }
        },

        getOwnProfile: async () => {
            try {
                const res = await axiosInstance.get(API_PATHS.PROFILE.ME);
                const { user } = res.data;

                if (res.data?.user) {
                    set({ authUser: normalizeUser(user) });
                    return user;
                } else {
                    console.error("Failed to fetch own profile: ", res.data?.error);
                    return null;
                }
            } catch (error) {
                console.error(`Own profile error: ${error}`);
                throw error.response?.data || error;
            }
        },

        viewProfile: async (username) => {
            try {
                const res = await axiosInstance.get(API_PATHS.PROFILE.VIEW_PROFILE(username));
                const { user } = res.data;

                return normalizeUser(user);
                
            } catch (error) {
                console.error(`View profile error: ${error}`);
                throw error.response?.data || error;
            }
        },

        updateProfile: async (data) => {
            set({ isUpdatingProfile: true });
            try {
                const formData = new FormData();
                if (data.username) formData.append("username", data.username);
                if (data.picture) formData.append("picture", data.picture);

                const res = await axiosInstance.patch(
                    API_PATHS.PROFILE.ME,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                const { user } = res.data;

                if (res.data?.user) {
                    set({ authUser: normalizeUser(user) });
                    return user;
                } else {
                    console.error("No user object returned from server");
                    return null;
                }
            } catch (error) {
                console.error(`Update profile error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ isUpdatingProfile: false });
            }
        },
        
        changePassword: async (oldPassword, newPassword) => {
            set({ isResettingPassword: true });
            try {
                const res = await axiosInstance.post(
                    API_PATHS.AUTH.CHANGE_PASSWORD,
                    { oldPassword, newPassword }
                );

                await axiosInstance.delete(API_PATHS.AUTH.LOGOUT);
                set({ authUser: null });

                return res.data;

            } catch (error) {
                console.error(`Change password error: ${error}`);
                throw error.response?.data || error;

            } finally {
                set({ isResettingPassword: false });
            }
        },

        changeCurrency: async (currency) => {
            try {
                const res = await axiosInstance.patch(
                    API_PATHS.PROFILE.CHANGE_CURRENCY,
                    { currency }
                );

                const { user } = res.data;
                set({ authUser: normalizeUser(user) });

                return user;
            } catch (error) {
                console.error(`Change currency error: ${error}`);
                throw error.response?.data || error;
            }
        },
    })),
    {
        name: "auth-storage",
        partialize: (state) => ({
            authUser: state.authUser
        }),
    }
);