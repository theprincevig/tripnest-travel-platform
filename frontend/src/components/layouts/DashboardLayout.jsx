import { useShowSearch } from "../../hooks/useNavbarConfig.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
    const isSearchVisible = useShowSearch();
    
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isSearchVisible={isSearchVisible} />
            <main className="flex-1 mx-5 my-8">{children}</main>
            <Footer />
        </div>
    );
}