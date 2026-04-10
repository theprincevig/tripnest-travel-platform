import { useShowSearch } from "../../hooks/useNavbarConfig.js";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
    const isSearchVisible = useShowSearch();
    
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isSearchVisible={isSearchVisible} />
            <div className="flex-1 flex mx-5 my-8">{children}</div>
        </div>
    );
}