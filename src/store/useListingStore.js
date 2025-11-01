import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API_URL;

const useListingStore = create((set, get) => ({
    listings: [],
    loading: false,
    error: null,
    fetched: false, // ✅ new flag to mark that we fetched data

    fetchAllListings: async () => {
        const { fetched, listings } = get();

        // ✅ Skip if already fetched once
        if (fetched && listings.length > 0) {
            // console.log("✅ Using cached listings (already fetched)");
            return;
        }

        try {
            // console.log("🌍 Fetching listings from server...");
            set({ loading: true, error: null });

            const res = await axios.get(`${API}/get-listings`, {
                withCredentials: true,
            });

            // console.log("✅ Response received:", res.data.listings?.length, "items");

            set({
                listings: res.data.listings || [],
                loading: false,
                fetched: true, // ✅ Mark as fetched
            });
        } catch (error) {
            // console.error("❌ Error fetching listings:", error);
            set({
                error: "Failed to fetch listings",
                loading: false,
                fetched: false,
            });
        }
    },
}));

export default useListingStore;
