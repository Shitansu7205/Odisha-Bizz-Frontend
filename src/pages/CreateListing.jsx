import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";


const ProductListingForm = () => {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        email: "",
        phone: "",
        address: {
            city: "",
            state: "",
            pincode: "",
        },
        socialMedia: {
            facebook: "",
            instagram: "",
            twitter: "",
            linkedin: "",
        },
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true); // ✅ Start loading before request
            try {
                const res = await axios.get(`${API}/check-auth`, {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    setLoading(false);
                }
            } catch (err) {
                toast.error(" unauthorized access!");
                navigate("/admin/login"); //  Redirect to login
            } finally {
                setLoading(false); // stop loader in all cases
            }
        };

        checkAuth();
    }, [navigate]);




    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                `${API}/post-listings`,
                formData,
                { withCredentials: true }
            );

            toast.success("Listing created successfully!");

            setFormData({
                title: "",
                description: "",
                category: "",
                email: "",
                phone: "",
                address: { city: "", state: "", pincode: "" },
                socialMedia: { facebook: "", instagram: "", twitter: "", linkedin: "" },
            });
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                setUnauthorized(true); // mark as unauthorized
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            {loading && <Loader />}
            <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
                {/* Left Image */}
                <div className="hidden md:flex md:w-1/2 justify-center">
                    <img
                        src="https://illustrations.popsy.co/gray/product-launch.svg"
                        alt="Listing Illustration"
                        className="w-4/5 h-auto"
                    />
                </div>

                {/* Right Form */}
                <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        Create Your Listing
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Travel">Travel</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Other">Other</option>
                        </select>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />

                        {/* Address Section */}
                        <input
                            type="text"
                            name="address.city"
                            placeholder="City"
                            value={formData.address.city}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="address.state"
                            placeholder="State"
                            value={formData.address.state}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="address.pincode"
                            placeholder="Pincode"
                            value={formData.address.pincode}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />

                        {/* Social Media */}
                        <input
                            type="text"
                            name="socialMedia.facebook"
                            placeholder="Facebook"
                            value={formData.socialMedia.facebook}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            name="socialMedia.instagram"
                            placeholder="Instagram"
                            value={formData.socialMedia.instagram}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            name="socialMedia.twitter"
                            placeholder="Twitter"
                            value={formData.socialMedia.twitter}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            name="socialMedia.linkedin"
                            placeholder="LinkedIn"
                            value={formData.socialMedia.linkedin}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create Listing
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default ProductListingForm;
