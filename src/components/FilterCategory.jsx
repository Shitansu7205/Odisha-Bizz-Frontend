import React, { useEffect, useState, useMemo } from "react";
import useListingStore from "@/store/useListingStore";
import Loader from "@/components/Loader";
import StaticCategoryPage from "@/components/StaticCategoryPage";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Filter, RefreshCw, Tag, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

const FilterCategory = () => {
    const { listings, fetchAllListings, loading, error } = useListingStore();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredListings, setFilteredListings] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("Bhubaneswar");



    // Fetch all listings once
    useEffect(() => {
        fetchAllListings();
    }, [fetchAllListings]);

    // Extract unique categories dynamically
    const categories = useMemo(() => {
        const allCats = listings.map(
            (item) => item.category?.trim() || "Uncategorized"
        );
        return [...new Set(allCats)];
    }, [listings]);

    // Handle filtering
    const handleFilter = (e) => {
        e.preventDefault();

        if (!selectedCategory) {
            setFilteredListings([]); // no filter selected → show Test again
            return;
        }

        const filtered = listings.filter(
            (item) =>
                item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredListings(filtered);
    };

    // Handle reset
    const handleReset = () => {
        setSelectedCategory("");
        setFilteredListings([]);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">


            {/* Filter Form */}
            <form
                onSubmit={handleFilter}
                className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5"
            >
                {/* Category Select */}
                <div className="flex items-center gap-2 w-full sm:w-64">
                    <div className="flex items-center justify-center bg-blue-100 p-2 rounded-md">
                        <Tag className="w-4 h-4 text-blue-600" />
                    </div>
                    <Select
                        value={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value)}
                    >
                        <SelectTrigger className="w-full border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Location Select */}
                <div className="flex items-center gap-2 w-full sm:w-64">
                    <div className="flex items-center justify-center bg-green-100 p-2 rounded-md">
                        <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <Select
                        value={selectedLocation}
                        onValueChange={(value) => setSelectedLocation(value)}
                    >
                        <SelectTrigger className="w-full border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 transition-all">
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Bhubaneswar">Bhubaneswar</SelectItem>
                            <SelectItem value="Cuttack">Cuttack</SelectItem>
                            <SelectItem value="Puri">Puri</SelectItem>
                            <SelectItem value="Rourkela">Rourkela</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2 sm:mt-0">
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset
                    </Button>
                </div>
            </form>

            {/* Listings Section */}
            {loading ? (
                <Loader />
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : filteredListings.length === 0 ? (
                // Default view when no filter applied
                <StaticCategoryPage />
            ) : (
                // Filtered Listings
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:mt-15">
                    {filteredListings.map((listing, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: idx * 0.2,
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                        >
                            <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-0 flex flex-col h-full pt-0 pb-0">
                                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={listing.imageUrl}
                                        alt={listing.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <CardContent className="flex flex-col justify-between flex-1 p-6 pt-0">
                                    <div>
                                        {/* Category Badge with Verified Tick */}
                                        <div className="flex items-center gap-1 mb-1">
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-500 text-white flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-md font-mono"
                                            >
                                                <CheckCircle className="h-3 w-3 text-white" />
                                                {listing.category || "Active"}
                                            </Badge>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {listing.title}
                                        </h3>

                                        {/* Description (2 lines only) */}
                                        <p className="text-gray-600 text-sm leading-relaxed text-justify line-clamp-2">
                                            {listing.description}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <Link
                                            to={`/listing-details/${listing._id}`}
                                            className="flex items-center gap-2 bg-[#249732] hover:bg-green-600 text-white rounded-full px-5 py-1.5 shadow-md transition-all duration-300"
                                        >
                                            More <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterCategory;
