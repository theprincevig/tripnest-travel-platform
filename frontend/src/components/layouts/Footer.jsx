import { Dot } from "lucide-react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";

export default function Footer() {
    const activeCurrency = useActiveCurrency();

    return (
        <footer className="w-full border-t border-zinc-200/60 bg-zinc-100 pb-20 mt-auto">
            <div className="flex flex-col gap-4 mx-8 p-4">
                {/* Top */}
                <div className="text-sm text-zinc-500">
                    © 2026 TripNest, Inc.
                </div>

                <div className="w-full flex items-center justify-between">
                    <div className="flex sm:flex-row flex-col items-center gap-2 text-sm opacity-80">
                        <button className="flex items-center gap-1 hover:underline">
                            <Dot size={12} /> Privacy
                        </button>

                        <button className="flex items-center gap-1 hover:underline">
                            <Dot size={12} /> Terms
                        </button>

                        <button className="flex items-center gap-1 hover:underline">
                            <Dot size={12} /> Sitemap
                        </button>

                        <button className="flex items-center gap-1 hover:underline">
                            <Dot size={12} /> Company details
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <p className="px-2 py-1">
                            {activeCurrency.details.symbol}
                            {" "}
                            {activeCurrency.code}
                        </p>
                        <a 
                            href="https://www.instagram.com/princeehehehe/"
                            className="p-2 rounded-full hover:bg-zinc-100 transition-all cursor-pointer"
                        >
                            <FaInstagram size={18} />
                        </a>

                        <a 
                            href="https://www.linkedin.com/in/princevig/"
                            className="p-2 rounded-full hover:bg-zinc-100 transition-all cursor-pointer"
                        >
                            <FaLinkedin size={18} />
                        </a>

                        <a 
                            href="https://github.com/theprincevig"
                            className="p-2 rounded-full hover:bg-zinc-100 transition-all cursor-pointer"
                        >
                            <FaGithub size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}