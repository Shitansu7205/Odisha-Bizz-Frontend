import React, { useEffect, useState } from "react";
import useListingStore from "../store/useListingStore";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SimilarProducts = ({ category }) => {
    const { listings, fetchAllListings, loading, error } = useListingStore();
    const [filtered, setFiltered] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllListings();
    }, [fetchAllListings]);

    useEffect(() => {
        if (category && listings.length > 0) {
            const filteredItems = listings.filter((item) => item.category === category);
            setFiltered(filteredItems);
        }
    }, [category, listings]);

    const visibleCount = 4;
    const total = filtered.length;

    // Autoplay infinite loop
    useEffect(() => {
        if (total <= visibleCount) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % total);
        }, 3500);
        return () => clearInterval(interval);
    }, [total]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % total);
    };

    if (loading) return <p>Loading similar products...</p>;
    if (error) return <p>Error loading products.</p>;
    if (filtered.length === 0) return <p>No similar products found.</p>;

    const visibleItems = Array.from({ length: visibleCount }).map((_, idx) => {
        const item = filtered[(currentIndex + idx) % total];
        return item;
    });

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Similar Products</h3>

            <div className="relative">
                {/* Slider */}
                <div className="flex gap-4 overflow-hidden pb-4">
                    {visibleItems.map((item) => (
                        <div
                            key={item._id}
                            className="w-72 shrink-0  border rounded-3xl shadow-lg hover:shadow-xs transition p-2"
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img
                                    src={item.imageUrl || "https://via.placeholder.com/300x200"}
                                    alt={item.title}
                                     loading="lazy"
                                    className="w-full h-44 object-cover rounded-t-2xl"
                                />
                                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                    {item.category}
                                </span>
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                                <button
                                    onClick={() => navigate(`/listing-details/${item.slug}`)}
                                    className="mt-3 flex items-center justify-center gap-2 bg-[#4f46e5] hover:bg-[#4f66e5] text-white py-1.5 rounded-full text-sm font-medium transition cursor-pointer"
                                >
                                    View More <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                {total > visibleCount && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 shadow hover:bg-gray-100 transition z-10"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-3 shadow hover:bg-gray-100 transition z-10"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SimilarProducts;
