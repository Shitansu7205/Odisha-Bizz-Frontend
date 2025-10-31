import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Building2,
    CheckCircle
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedin, FaGlobe, FaArrowRight } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";


const CategoryPage = () => {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${API}/get-category-listings/${encodeURIComponent(categoryName)}`
                );
                const data = await response.json();

                // ✅ Ensure only arrays are set
                if (Array.isArray(data)) {

                    const sorted = [...data].sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setProducts(data);
                    setLatestProducts(sorted.slice(0, 5));
                    setLoading(false);
                    toast.success("Data fetched successfully!");
                } else {
                    setProducts([]); // fallback to empty array
                    setLatestProducts([]);
                }
            } catch (err) {
                setProducts([]);
                setLatestProducts([]);
                toast.error("Error fetching category data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    return (
        <>
            {Loading && <Loader />}
            {/* Hero Section */}
            <section className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src="https://ctsdemo.com/odishabiz-website/assets/images/Finance_Banking.jpg"
                    alt="Background Image"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 text-center text-white px-4"
                >
                    <p className="text-sm sm:text-base text-gray-200 mb-2 tracking-wide">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide drop-shadow-lg">
                        {categoryName}
                    </h1>
                </motion.div>
            </section>
            <div className="max-w-[1400px] mx-auto px-6 py-12 lg:flex lg:gap-12">
                {/* Left - Blogs */}
                <div className="lg:w-2/3 space-y-12">
                    {
                        products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg border border-gray-200">
                                <img
                                    src="/images/data-not-found.png"
                                    alt="No products"
                                    className="w-40 h-40 mb-4 opacity-80"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
                                <p className="text-gray-500 text-sm mt-1">
                                    Try checking another category or come back later.
                                </p>
                            </div>
                        ) : (

                            products.map((product, idx) => (
                                <div
                                    key={idx}
                                    id={product._id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <img
                                        src={
                                            product.imageUrl
                                                ? product.imageUrl
                                                : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                                        }
                                        alt={product.title || "Product image"}
                                        className="w-full h-76 object-cover rounded-lg"
                                    />

                                    <div className="p-6 space-y-5">
                                        {/* Header */}
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                                <Building2 className="w-5 h-5 text-yellow-600" />
                                                {product.title}
                                            </h2>

                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-500 text-white dark:bg-blue-600"
                                            >
                                                <CheckCircle className="h-3.5 w-3.5 text-white" />
                                                {product.category}
                                            </Badge>

                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-700 text-sm leading-relaxed text-justify">
                                            {product.description}
                                        </p>

                                        {/* Contact & Location */}
                                        <div className="border-t border-gray-100 pt-4 flex flex-wrap items-center gap-6 text-sm text-gray-700">
                                            {/* Email */}
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                <span className="truncate ">{product.email || "Not Provided"}</span>
                                            </div>

                                            {/* Phone */}
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-green-600" />
                                                <span>{product.phone || "Not Provided"}</span>
                                            </div>

                                            {/* Location */}
                                            {product.address && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-red-600" />
                                                    <span>
                                                        {product.address.city}, {product.address.state}{" "}
                                                        <span className="text-gray-500">(Pin: {product.address.pincode})</span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>


                                        {/* Social Media */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                            {/* Left side - Social icons */}
                                            <div className="flex gap-4">
                                                <TooltipProvider>
                                                    {product.socialMedia?.facebook && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <a
                                                                    href={product.socialMedia.facebook}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                                                                >
                                                                    <FaFacebookF size={16} />
                                                                </a>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Visit Facebook</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}

                                                    {product.socialMedia?.instagram && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <a
                                                                    href={product.socialMedia.instagram}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white transition-all"
                                                                >
                                                                    <FaInstagram size={16} />
                                                                </a>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Visit Instagram</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}

                                                    {product.socialMedia?.twitter && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <a
                                                                    href={product.socialMedia.twitter}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
                                                                >
                                                                    <FaXTwitter size={16} />
                                                                </a>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Visit Twitter / X</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}

                                                    {product.socialMedia?.linkedin && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <a
                                                                    href={product.socialMedia.linkedin}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
                                                                >
                                                                    <FaLinkedin size={16} />
                                                                </a>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Visit LinkedIn</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </TooltipProvider>
                                            </div>

                                            {/* Right side - Website badge */}
                                            {product.socialMedia?.website && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <a
                                                                href={product.socialMedia.website}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-1 p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
                                                            >
                                                                <FaGlobe className="w-5 h-5" />
                                                            </a>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Visit Website</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )))}

                </div>

                {/* Right - Latest Listings */}
                <div className="lg:w-1/3 mt-12 lg:mt-0 lg:sticky lg:top-24 self-start">

                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Latest Listings</h3>
                    <div className="space-y-5">

                        {latestProducts.map((b, idx) => (
                            <a
                                key={idx}
                                href={`#${b._id}`}
                                className="block group"
                            >
                                <div className="flex items-center gap-4 p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:bg-linear-to-r hover:from-white/90 hover:to-blue-50">

                                    {/* Image */}
                                    <div className="relative w-18 h-18 shrink-0">
                                        <img
                                            src={
                                                b.imageUrl
                                                    ? b.imageUrl
                                                    : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                                            }
                                            alt={b.title}
                                            className="w-18 h-18 object-cover rounded-full border-2 border-blue-100"
                                        />
                                        <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-base leading-tight">
                                                {b.title}
                                            </h4>
                                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full shadow-sm">
                                                {new Date(b.createdAt).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1 text-justify leading-snug line-clamp-2">
                                            {b.description}
                                        </p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-2 transition-all duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        ))}


                    </div>


                </div>
            </div>
        </>
    );
};

export default CategoryPage;
