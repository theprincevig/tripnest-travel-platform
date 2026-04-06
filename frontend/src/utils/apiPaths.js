export const API_PATHS = {
    AUTH: {
        SESSION: "/api/auth/session",
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GOOGLE_LOGIN: "/api/auth/google",
        LOGOUT: "/api/auth/logout",
        GET_USER: "/api/auth/get-user",
        CHANGE_PASSWORD: "/api/auth/change-password"
    },
    PROFILE: {
        ME: "/api/users/me",
        BECOME_HOST: "/api/users/become-host"
    },
    LISTINGS: {
        GET_ALL: "/api/listings",
        GET_ONE: (id) => `/api/listings/${id}`,
        CREATE: "/api/listings",
        UPDATE: (id) => `/api/listings/${id}`,
        DELETE: (id) => `/api/listings/${id}`
    },
    REVIEWS: {
        GET_ALL: (listingId) => `/api/listings/${listingId}/reviews`,
        CREATE: (listingId) => `/api/listings/${listingId}/reviews`,
        DELETE: (listingId, reviewId) => `/api/listings/${listingId}/reviews/${reviewId}`
    }
};