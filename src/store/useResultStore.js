// store/useResultStore.js
import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API_URL;

export const useResultStore = create((set, get) => ({
    mainListings: [],
    related: [],
    loading: false,
    error: null,
    fetchedCache: {}, // cache multiple searches

    // helper to normalize strings
    normalize: (str) => (str ? str.trim().toLowerCase() : ""),

    fetchResults: async (district, category) => {
        const normalize = get().normalize;
        const key = `${normalize(district)}__${normalize(category)}`;
        const { fetchedCache } = get();


        if (fetchedCache[key]) {
            // console.log("✅ Using cached data for", key);
            set({
                mainListings: fetchedCache[key].mainListings,
                related: fetchedCache[key].related,
                loading: false,
                error: null,
            });
            return;
        }

        try {
            set({ loading: true, error: null });
            const res = await axios.get(
                `${API}/all-products?district=${district}&category=${category}`
            );

            const mainListings = res.data.mainListings || [];
            const related = res.data.related || [];

            // store in cache
            set((state) => ({
                mainListings,
                related,
                loading: false,
                fetchedCache: {
                    ...state.fetchedCache,
                    [key]: { mainListings, related },
                },
            }));
        } catch (err) {
            // console.error("Error fetching results:", err);
            set({ loading: false, error: err.message });
        }


    },
}));
