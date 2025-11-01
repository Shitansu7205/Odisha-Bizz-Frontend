import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API_URL;

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    checkAuth: async () => {
        try {
            const res = await axios.get(`${API}/check-auth`, { withCredentials: true });
            if (res.status === 200) {
                set({ isAuthenticated: true });
            }
        } catch (error) {
            set({ isAuthenticated: false });
            if (error.response?.status === 401) {
                console.warn("⚠️ User not authenticated");
            } else {
                console.error("❌ Auth check failed:", error.message);
            }
        }
    },
}));

export default useAuthStore;
