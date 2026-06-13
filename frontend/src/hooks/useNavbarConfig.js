import { useLocation } from "react-router-dom"

export const useShowSearch = () => {
    const { pathname } = useLocation();
    const hiddenRoutes = [
        /^\/login$/,
        /^\/register$/,
        /^\/new$/,
        /^\/users\/me$/,
        /^\/users\/[^/]+$/,
        /^\/change-password$/,
        /^\/listings\/[^/]+$/,
        /^\/listings\/[^/]+\/edit$/,
    ];
    
    const isHidden = hiddenRoutes.some((route) =>
        route.test(pathname)
    );

    return !isHidden;
}