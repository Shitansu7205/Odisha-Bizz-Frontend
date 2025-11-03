import React, { useEffect, useState, useMemo } from "react";
import useListingStore from "@/store/useListingStore";
import Loader from "@/components/Loader";
import Allproducts from "../components/Allproducts";


const FilterCategory = () => {
    const { listings, fetchAllListings, loading, error } = useListingStore();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredListings, setFilteredListings] = useState([]);

    // Fetch all listings once
    useEffect(() => {
        fetchAllListings();
    }, [fetchAllListings]);

    // Extract unique categories dynamically
    const categories = useMemo(() => {
        const allCats = listings.map((item) => item.category?.trim() || "Uncategorized");
        return [...new Set(allCats)];
    }, [listings]);

    // Handle form submit (filter listings only after button click)
    const handleFilter = (e) => {
        e.preventDefault();

        if (!selectedCategory) {
            setFilteredListings(listings); // show all if no category selected
            return;
        }

        const filtered = listings.filter(
            (item) =>
                item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredListings(filtered);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Filter Listings by Category
            </h2>

            {/* Filter Form */}
            <form
                onSubmit={handleFilter}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="cursor-pointer bg-[#012a7a] hover:bg-[#001846] text-white px-6 py-2 rounded-md shadow-md transition-all"
                >
                    Filter
                </button>
            </form>

            {/* Listings Section */}
            {loading ? (
                <Loader />
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : filteredListings.length === 0 ? (
                <p className="text-gray-500 text-center">
                   STATIC CATEGORY  DATA DISPLAY HERE
                </p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                        <li
                            key={listing._id}
                            className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
                            <p className="text-gray-600">{listing.category}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterCategory;
