import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"


const ForgotPassword = () => {
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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 px-4">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
                    Forgot Password?
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your registered email to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-black text-white py-3 rounded-lg font-medium transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                            }`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Remember your password?{" "}
                        <Link to="/admin/login" className="text-black font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                    <p className="mt-2">
                        Don’t have an account?{" "}
                        <Link
                            to="/admin/signup"
                            className="text-black font-medium hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>

                <p className="text-xs text-gray-400 mt-6 text-center">
                    By proceeding, you agree to our{" "}
                    <Link to="/terms" className="underline hover:text-gray-600">
                        Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="underline hover:text-gray-600">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
