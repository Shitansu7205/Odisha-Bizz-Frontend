// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//     Menu, Plus,
//     User,
//     LogIn,
//     LogOut,
//     KeyRound,
//     ChevronDown,
//     MessageCircle,
// } from "lucide-react";
// import {
//     Sheet,
//     SheetContent,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import { Link, useNavigate } from "react-router-dom";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import axios from "axios";
// import { toast } from "react-toastify";
// import useAuthStore from "@/store/useAuthStore";








// const Navbar = () => {
//     const API = import.meta.env.VITE_BACKEND_API_URL;
//     const { isAuthenticated, checkAuth } = useAuthStore();
//     const navigate = useNavigate();

//     useEffect(() => {
//         checkAuth();
//     }, []);


    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await axios.get(`${API}/check-auth`, { withCredentials: true });
    //             if (res.status === 200) {
    //                 setIsAuthenticated(true);
    //             }
    //         } catch (error) {
    //             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //                 setIsAuthenticated(false);
    //             } else {
    //                 console.error("Auth check failed:", error);
    //             }
    //         }
    //     };
    //     checkAuth();
    // }, []);


//     const handleLogout = async () => {
//         try {
//             const res = await axios.post(
//                 `${API}/logout`,
//                 {},
//                 { withCredentials: true }
//             );

//             if (res.status === 200) {
//                 toast.success("Logged out successfully!"); // show success toast
//                 window.location.reload();
//                 navigate("/"); // redirect after logout
//             } else {
//                 toast.error("Logout failed. Please try again."); // fallback
//             }
//         } catch (err) {

//             toast.error("Logout failed. Please try again."); // show error toast
//         }
//     };
//     return (
//         <header className="w-full bg-white shadow-sm sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
//                 {/* Logo Section */}
//                 <div className="flex items-center gap-2">
//                     <Link to="/" className="flex items-center gap-2">
//                         <img
//                             src="/images/logo.png"
//                             alt="Odisha Bizz"
//                             className="h-10 object-contain hidden sm:block"
//                         />
//                         <img
//                             src="/images/logo.png"
//                             alt="Odisha Bizz"
//                             className="h-10 object-contain sm:hidden"
//                         />
//                     </Link>
//                 </div>

//                 {/* Desktop Menu */}
//                 <nav className="hidden md:flex items-center gap-8">
//                     <Link to="/" className="text-gray-900 font-medium hover:text-green-700 transition">
//                         Home
//                     </Link>
//                     <Link to="/about" className="text-gray-900 font-medium hover:text-green-700 transition">
//                         About
//                     </Link>
//                     <Link to="/categories" className="text-gray-900 font-medium hover:text-green-700 transition">
//                         Categories
//                     </Link>
//                     {/* <Link to="/contact" className="text-gray-900 font-medium hover:text-green-700 transition">
//                         Contact
//                     </Link> */}
//                     <Button
//                         asChild
//                         className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 font-medium shadow-md transition-all"
//                     >
//                         <Link to="/contact">
//                             <MessageCircle className="w-5 h-5" /> Get In Touch
//                         </Link>
//                     </Button>

//                     <div className="flex items-center gap-4">
//                         {isAuthenticated ? (
//                             <Button
//                                 asChild
//                                 className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 font-medium shadow-md transition-all"
//                             >
//                                 <Link to="/listing/create">
//                                     <Plus className="w-5 h-5" /> Add Your One
//                                 </Link>
//                             </Button>
//                         ) : (
//                             null
//                         )}

//                         {/* Authenticated / Non-Authenticated Buttons */}
//                         {isAuthenticated ? (
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 shadow-md transition-all">
//                                         <User className="w-5 h-5" />
//                                         <span className="font-medium">Dashboard</span>
//                                         <ChevronDown className="w-4 h-4" />
//                                     </Button>
//                                 </DropdownMenuTrigger>

//                                 <DropdownMenuContent align="end" className="mt-2 w-44 rounded-xl shadow-lg border bg-white">
//                                     <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
//                                         Account
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuSeparator />

//                                     <DropdownMenuItem asChild>
//                                         <Link
//                                             to="/admin/dashboard"
//                                             className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
//                                         >
//                                             <User className="w-4 h-4" /> My Dashboard
//                                         </Link>
//                                     </DropdownMenuItem>

//                                     <DropdownMenuItem asChild>
//                                         <Link
//                                             to="/reset-password"
//                                             className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
//                                         >
//                                             <KeyRound className="w-4 h-4" /> Reset Password
//                                         </Link>
//                                     </DropdownMenuItem>

//                                     <DropdownMenuSeparator />

//                                     <DropdownMenuItem
//                                         onClick={handleLogout}
//                                         className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
//                                     >
//                                         <LogOut className="w-4 h-4" /> Logout
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         ) : (
//                             null
//                         )}

//                     </div>
//                 </nav>

//                 {/* Mobile Menu */}
//                 <div className="md:hidden">
//                     <Sheet>
//                         <SheetTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                                 <Menu className="w-6 h-6 text-gray-800" />
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="right" className="p-6 bg-white">
//                             <nav className="flex flex-col gap-6 text-lg">
//                                 <Link to="/" className="hover:text-[#b6985a]">
//                                     Home
//                                 </Link>
//                                 <Link to="/about" className="hover:text-[#b6985a]">
//                                     About
//                                 </Link>
//                                 <Link to="/categories" className="hover:text-[#b6985a]">
//                                     Categories
//                                 </Link>
//                                 <Link to="/contact" className="hover:text-[#b6985a]">
//                                     Contact
//                                 </Link>

//                                 <Button
//                                     asChild
//                                     className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 shadow-md"
//                                 >
//                                     <Link to="/listing/create">
//                                         <Plus className="w-5 h-5 mr-1" /> Add Your One
//                                     </Link>
//                                 </Button>
//                                 {isAuthenticated ? (
//                                     <DropdownMenu>
//                                         <DropdownMenuTrigger asChild>
//                                             <Button className="bg-[#b6985a] hover:bg-[#a58648] text-white rounded-full px-6 py-2 shadow-md flex items-center gap-2">
//                                                 <User className="w-5 h-5" />
//                                                 Dashboard
//                                                 <ChevronDown className="w-4 h-4" />
//                                             </Button>
//                                         </DropdownMenuTrigger>

//                                         <DropdownMenuContent
//                                             align="end"
//                                             className="mt-2 w-44 rounded-xl border bg-white shadow-lg"
//                                         >
//                                             <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
//                                                 Account
//                                             </DropdownMenuLabel>
//                                             <DropdownMenuSeparator />

//                                             <DropdownMenuItem asChild>
//                                                 <Link
//                                                     to="/admin/dashboard"
//                                                     className="flex items-center gap-2 text-gray-700 hover:text-[#b6985a]"
//                                                 >
//                                                     <User className="w-4 h-4" /> My Dashboard
//                                                 </Link>
//                                             </DropdownMenuItem>

//                                             <DropdownMenuItem asChild>
//                                                 <Link
//                                                     to="/reset-password"
//                                                     className="flex items-center gap-2 text-gray-700 hover:text-[#b6985a]"
//                                                 >
//                                                     <KeyRound className="w-4 h-4" /> Reset Password
//                                                 </Link>
//                                             </DropdownMenuItem>

//                                             <DropdownMenuSeparator />

//                                             <DropdownMenuItem
//                                                 onClick={handleLogout}
//                                                 className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
//                                             >
//                                                 <LogOut className="w-4 h-4" /> Logout
//                                             </DropdownMenuItem>
//                                         </DropdownMenuContent>
//                                     </DropdownMenu>
//                                 ) : (
//                                     <Button
//                                         asChild
//                                         className="bg-[#b6985a] hover:bg-[#a58648] text-white rounded-full px-6 py-2 shadow-md flex items-center gap-2"
//                                     >
//                                         <Link to="/admin/login">
//                                             <LogIn className="w-5 h-5" /> Sign In
//                                         </Link>
//                                     </Button>
//                                 )}
//                             </nav>
//                         </SheetContent>
//                     </Sheet>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Navbar;









import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Plus,
  User,
  LogIn,
  LogOut,
  KeyRound,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "@/store/useAuthStore";

const Navbar = () => {
  const API = import.meta.env.VITE_BACKEND_API_URL;
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  // ✅ Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${API}/logout`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Logged out successfully!");
        window.location.reload();
        navigate("/");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleMenuClick = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Odisha Bizz"
              className="h-[50px] w-[140px] object-contain hidden sm:block"
            />
            <img
              src="/images/logo.png"
              alt="Odisha Bizz"
              className="h-10 object-contain sm:hidden"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-[#249732]"
                  : "text-gray-900 hover:text-[#249732]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-[#249732]"
                  : "text-gray-900 hover:text-[#249732]"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-[#249732]"
                  : "text-gray-900 hover:text-[#249732]"
              }`
            }
          >
            Categories
          </NavLink>

          <Button
            asChild
            className="flex items-center gap-2 bg-[#249732] hover:bg-green-700 text-white rounded-full px-5 py-2 font-medium shadow-md transition-all"
          >
            <Link to="/contact">
              <MessageCircle className="w-5 h-5" /> Get In Touch
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Button
                asChild
                className="flex items-center gap-2 bg-[#249732] hover:bg-green-700 text-white rounded-full px-5 py-2 font-medium shadow-md transition-all"
              >
                <Link to="/listing/create">
                  <Plus className="w-5 h-5" /> Add Your One
                </Link>
              </Button>
            )}

            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="cursor-pointer flex items-center gap-2 bg-[#012a7a] hover:bg-[#001846] text-white rounded-full px-6 py-2 shadow-md transition-all">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Dashboard</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="mt-2 w-44 rounded-xl shadow-lg border bg-white"
                >
                  <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                    Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                    >
                      <User className="w-4 h-4" /> My Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/forgot-password"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                    >
                      <KeyRound className="w-4 h-4" /> Reset Password
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>

        {/* ✅ Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-gray-800" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6 bg-white">
              <nav className="flex flex-col gap-6 text-lg">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-left transition ${
                      isActive
                        ? "text-[#249732]"
                        : "text-gray-900 hover:text-[#249732]"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-left transition ${
                      isActive
                        ? "text-[#249732]"
                        : "text-gray-900 hover:text-[#249732]"
                    }`
                  }
                >
                  About
                </NavLink>

                <NavLink
                  to="/categories"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-left transition ${
                      isActive
                        ? "text-[#249732]"
                        : "text-gray-900 hover:text-[#249732]"
                    }`
                  }
                >
                  Categories
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-left transition ${
                      isActive
                        ? "text-[#249732]"
                        : "text-gray-900 hover:text-[#249732]"
                    }`
                  }
                >
                  Contact
                </NavLink>

                {isAuthenticated && (
                  <Button
                    onClick={() => handleMenuClick("/listing/create")}
                    className="bg-[#249732] hover:bg-green-700 text-white rounded-full px-5 py-2 shadow-md flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5 mr-1" /> Add Your One
                  </Button>
                )}

                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-[#012a7a] hover:bg-[#001846] text-white rounded-full px-6 py-2 shadow-md flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Dashboard
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="mt-2 w-44 rounded-xl border bg-white shadow-lg"
                    >
                      <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                        Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => handleMenuClick("/admin/dashboard")}
                          className="flex items-center gap-2 text-gray-700 hover:text-[#b6985a]"
                        >
                          <User className="w-4 h-4" /> My Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          to="/reset-password"
                          onClick={() => handleMenuClick("/reset-password")}
                          className="flex items-center gap-2 text-gray-700 hover:text-[#b6985a]"
                        >
                          <KeyRound className="w-4 h-4" /> Reset Password
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={() => handleMenuClick("/admin/login")}
                    className="bg-[#b6985a] hover:bg-[#a58648] text-white rounded-full px-6 py-2 shadow-md flex items-center gap-2"
                  >
                    <LogIn className="w-5 h-5" /> Sign In
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
