// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify"


// const ForgotPassword = () => {
//     const API = import.meta.env.VITE_BACKEND_API_URL;
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const res = await axios.post(`${API}/forgot-password`, { email });
//             toast.success("✅ Password reset link sent! Check your email.");
//             setEmail("");
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 px-4">
//             <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
//                     Forgot Password?
//                 </h2>
//                 <p className="text-sm text-gray-600 text-center mb-6">
//                     Enter your registered email to receive a password reset link.
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="email"
//                         placeholder="Enter your email address"
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className={`w-full bg-black text-white py-3 rounded-lg font-medium transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
//                             }`}
//                     >
//                         {loading ? "Sending..." : "Send Reset Link"}
//                     </button>
//                 </form>

//                 <div className="mt-6 text-center text-sm text-gray-600">
//                     <p>
//                         Remember your password?{" "}
//                         <Link to="/admin/login" className="text-black font-medium hover:underline">
//                             Login
//                         </Link>
//                     </p>
//                     <p className="mt-2">
//                         Don’t have an account?{" "}
//                         <Link
//                             to="/admin/signup"
//                             className="text-black font-medium hover:underline"
//                         >
//                             Create Account
//                         </Link>
//                     </p>
//                 </div>

//                 <p className="text-xs text-gray-400 mt-6 text-center">
//                     By proceeding, you agree to our{" "}
//                     <Link to="/terms" className="underline hover:text-gray-600">
//                         Terms & Conditions
//                     </Link>{" "}
//                     and{" "}
//                     <Link to="/privacy" className="underline hover:text-gray-600">
//                         Privacy Policy
//                     </Link>
//                     .
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;



import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, KeyRound, Send, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${API}/forgot-password`, { email });
            toast.success("✅ Password reset link sent! Check your email.");
            setEmail("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f9f9fc]">
            {/* LEFT SIDE - Illustration */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f9f9fc] p-10">
                <motion.img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-illustration-svg-download-png-3551744.png"
                    alt="Lock illustration"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 1, y: 0 }} // Start visible
                    animate={{ y: [-10, 10] }} // Up and down movement
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror", // ✅ Smooth continuous loop, no flicker
                    }}
                />

            </div>

            {/* RIGHT SIDE - Form */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 md:px-16 py-10">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8 justify-start lg:-ml-52">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="w-full h-10 object-contain animate-fade-in"
                        />

                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        Reset your Password
                    </h2>
                    <p className="text-gray-500 mb-6">
                        The verification email will be sent to the mailbox. <br />
                        Please check it.
                    </p>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="pl-9 rounded-md border-gray-300 focus-visible:ring-blue-500"
                                />
                            </div>
                        </div>



                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white text-md py-5 rounded-lg font-medium transition flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"}`}
                        >
                            <Send className="w-5 h-5" />
                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>

                    </form>

                    <div className="mt-6 text-center">
                        <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                            <Link
                                to="/admin/login"
                                className="inline-flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Login
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
