import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${API}/reset-password/${token}`, { password });
            toast.success("✅ Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid or expired link!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
                    Reset Password
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-black text-white py-3 rounded-lg font-medium transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                            }`}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>

                <p className="text-xs text-gray-400 mt-6 text-center">
                    Having trouble?{" "}
                    <a
                        href="/admin/forgot-password"
                        className="underline hover:text-gray-600"
                    >
                        Request a new reset link
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
