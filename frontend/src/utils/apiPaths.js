export const API_PATHS = {
    AUTH: {
        SESSION: "/api/auth/session",
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GOOGLE_LOGIN: "/api/auth/google",
        LOGOUT: "/api/auth/logout",
        CHANGE_PASSWORD: "/api/auth/change-password"
    },
    PROFILE: {
        ME: "/api/users/me",
        CHANGE_CURRENCY: "/api/users/me/currency",
        VIEW_PROFILE: (username) => `/api/users/${username}`,
        BECOME_HOST: "/api/users/host",
        HOST_STATS: (hostId) => `/api/users/${hostId}/stats`
    },
    LISTINGS: {
        GET_ALL: "/api/listings",
        GET_ONE: (id) => `/api/listings/${id}`,
        CREATE: "/api/listings",
        UPDATE: (id) => `/api/listings/${id}`,
        DELETE: (id) => `/api/listings/${id}`
    },
    RESERVATION: {
        GET: "/api/reservations/me",
        CREATE: (listingId) => `/api/listings/${listingId}/reserve`,
        CANCEL: (listingId, reserveId) => `/api/listings/${listingId}/reserve/${reserveId}/cancel`,
    },
    REVIEWS: {
        GET_ALL: (listingId) => `/api/listings/${listingId}/reviews`,
        CREATE: (listingId) => `/api/listings/${listingId}/reviews`,
        DELETE: (listingId, reviewId) => `/api/listings/${listingId}/reviews/${reviewId}`
    },
    RATES: {
        EXCHANGE: "/api/exchange-rates"
    }
};