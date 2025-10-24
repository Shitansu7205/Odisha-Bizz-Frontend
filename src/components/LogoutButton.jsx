import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.post(
                "https://odisha-bizz-backend.onrender.com/api/auth/logout",
                {},
                { withCredentials: true }
            );

            if (res.status === 200) {
                toast.success("Logged out successfully!"); // show success toast
                navigate("/admin/login"); // redirect after logout
            } else {
                toast.error("Logout failed. Please try again."); // fallback
            }
        } catch (err) {
            console.error("Logout failed:", err);
            toast.error("Logout failed. Please try again."); // show error toast
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
