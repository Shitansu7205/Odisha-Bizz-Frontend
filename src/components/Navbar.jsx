import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Plus, LogIn, User } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";









const Navbar = () => {
    const API = import.meta.env.VITE_API_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${API}/check-auth`, { withCredentials: true });
                if (res.status === 200) setIsAuthenticated(true);
            } catch {
                if (res.status === 401 || res.status === 403) setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://ctsdemo.com/odishabiz-website/assets/images/odishabiz-logo.png"
                            alt="Odisha Bizz"
                            className="h-10 object-contain hidden sm:block"
                        />
                        <img
                            src="https://ctsdemo.com/odishabiz-website/assets/images/odishabiz-logo.png"
                            alt="Odisha Bizz"
                            className="h-10 object-contain sm:hidden"
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-gray-900 font-medium hover:text-green-700 transition">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-900 font-medium hover:text-green-700 transition">
                        About
                    </Link>
                    <Link to="/categories" className="text-gray-900 font-medium hover:text-green-700 transition">
                        Categories
                    </Link>
                    <Link to="/contact" className="text-gray-900 font-medium hover:text-green-700 transition">
                        Contact
                    </Link>

                    <div className="flex items-center gap-4">
                        <Button
                            asChild
                            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5"
                        >
                            <Link to="/listing/create"><Plus className="w-5 h-5" /> Add Your One</Link>
                        </Button>
                        {isAuthenticated ? (
                            <Button
                                asChild
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 shadow-md transition"
                            >
                                <Link to="/dashboard" className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Dashboard</span>
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                asChild
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 shadow-md transition"
                            >
                                <Link to="/admin/login" className="flex items-center gap-2">
                                    <LogIn className="w-5 h-5" />
                                    <span className="font-medium">Sign In</span>
                                </Link>
                            </Button>
                        )}

                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6 text-gray-800" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-6 bg-white">
                            <nav className="flex flex-col gap-6 text-lg">
                                <Link to="/" className="hover:text-[#b6985a]">
                                    Home
                                </Link>
                                <Link to="/about" className="hover:text-[#b6985a]">
                                    About
                                </Link>
                                <Link to="/categories" className="hover:text-[#b6985a]">
                                    Categories
                                </Link>
                                <Link to="/contact" className="hover:text-[#b6985a]">
                                    Contact
                                </Link>

                                <Button
                                    asChild
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-full"
                                >
                                    <Link to="/listing/create"><Plus className="w-5 h-5" />Add Your One</Link>
                                </Button>
                                {isAuthenticated ? (
                                    <Button asChild className="bg-[#b6985a] hover:bg-[#a58648] text-white rounded-full">
                                        <Link to="/dashboard">
                                            <User className="w-5 h-5" /> Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button asChild className="bg-[#b6985a] hover:bg-[#a58648] text-white rounded-full">
                                        <Link to="/admin/login">
                                            <LogIn className="w-5 h-5" /> Sign In
                                        </Link>
                                    </Button>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
