import { useLocation } from "react-router-dom"

export const useShowSearch = () => {
    const { pathname } = useLocation();
    const hiddenRoutes = new Set([
        "/login", 
        "/register", 
        "/users/me",
        "/users/:username",
        "/change-password",
        "/listings/:listingId/edit"
    ]);
    
    return !hiddenRoutes.has(pathname);
}