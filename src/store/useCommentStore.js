import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API_URL;

const useCommentStore = create((set, get) => ({
  comments: {}, // { [listingId]: [array of comments] }
  loading: false,

  fetchComments: async (listingId) => {
    const existing = get().comments[listingId];
    if (existing) return; // ✅ already fetched — skip another API call

    set({ loading: true });
    try {
      const res = await axios.get(`${API}/comments/${listingId}`);
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      set((state) => ({
        comments: { ...state.comments, [listingId]: sorted },
      }));
    } catch (err) {
      console.error("❌ Error fetching comments:", err);
    } finally {
      set({ loading: false });
    }
  },

  addComment: async (listingId, text) => {
    try {
      await axios.post(
        `${API}/comments/add-comment`,
        { listingId, text },
        { withCredentials: true }
      );

      // Refresh the local comments immediately
      const res = await axios.get(`${API}/comments/${listingId}`);
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      set((state) => ({
        comments: { ...state.comments, [listingId]: sorted },
      }));
    } catch (err) {
      throw err;
    }
  },
}));

export default useCommentStore;
