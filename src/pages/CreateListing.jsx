import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateListing = () => {
    const [form, setForm] = useState({
        title: "",
        category: "Travel",
        description: "",
        contact: { phone: "", email: "", website: "" },
        socialLinks: { facebook: "", instagram: "", twitter: "" },
        location: { address: "", city: "", state: "", country: "", mapLink: "" },
        status: "draft",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setForm((prev) => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://odisha-bizz-backend.onrender.com/api/auth/post-listings",
                form,
                { withCredentials: true }
            );
            toast.success("Listing created successfully!");
            setForm({
                title: "",
                category: "Travel",
                description: "",
                contact: { phone: "", email: "", website: "" },
                socialLinks: { facebook: "", instagram: "", twitter: "" },
                location: { address: "", city: "", state: "", country: "", mapLink: "" },
                status: "draft",
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 border rounded">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
            />

            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            >
                <option value="Travel">Travel</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Grocery">Grocery</option>
                <option value="Other">Other</option>
            </select>

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
            />

            {/* Contact */}
            <input
                type="text"
                name="contact.phone"
                placeholder="Phone"
                value={form.contact.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="email"
                name="contact.email"
                placeholder="Email"
                value={form.contact.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                name="contact.website"
                placeholder="Website"
                value={form.contact.website}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />

            {/* Social Links */}
            <input
                type="text"
                name="socialLinks.facebook"
                placeholder="Facebook"
                value={form.socialLinks.facebook}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                name="socialLinks.instagram"
                placeholder="Instagram"
                value={form.socialLinks.instagram}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                name="socialLinks.twitter"
                placeholder="Twitter"
                value={form.socialLinks.twitter}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />

            {/* Location */}
            <input
                type="text"
                name="location.address"
                placeholder="Address"
                value={form.location.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                name="location.city"
                placeholder="City"
                value={form.location.city}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                name="location.state"
                placeholder="State"
                value={form.location.state}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                name="location.country"
                placeholder="Country"
                value={form.location.country}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                name="location.mapLink"
                placeholder="Map Link"
                value={form.location.mapLink}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
            </select>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Create Listing
            </button>
        </form>
    );
};

export default CreateListing;
