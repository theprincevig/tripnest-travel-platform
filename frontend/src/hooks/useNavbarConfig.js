import { useLocation } from "react-router-dom"

export const useShowSearch = () => {
    const { pathname } = useLocation();
    const hiddenRoutes = new Set([
        "/login", 
        "/register", 
        "/change-password"
    ]);
    
    return !hiddenRoutes.has(pathname);
}