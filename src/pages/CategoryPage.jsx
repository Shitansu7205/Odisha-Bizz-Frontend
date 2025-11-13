// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//     Mail,
//     Phone,
//     MapPin,
//     Globe,
//     Building2,
//     CheckCircle,
//     ArrowRight
// } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedin, FaGlobe, FaArrowRight } from "react-icons/fa6";
// import { Badge } from "@/components/ui/badge";
// import {
//     Tooltip,
//     TooltipTrigger,
//     TooltipContent,
//     TooltipProvider,
// } from "@/components/ui/tooltip";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import Loader from "@/components/Loader";
// import useListingStore from "@/store/useListingStore";
// import { useMemo } from "react";
// import { Link } from "react-router-dom";

// const CategoryPage = () => {
//     const { categoryName } = useParams();

//     const { listings, fetchAllListings, loading, error } = useListingStore();

//     // Fetch all listings once (only if not already loaded)
//     useEffect(() => {
//         const loadData = async () => {
//             await fetchAllListings();

//             // ✅ Toast only after fetching
//             if (error) toast.error("Failed to load listings. Please try again.");
//             else if (!loading && listings.length > 0)
//                 toast.success("Listings loaded successfully!");
//         };

//         loadData();
//     }, [fetchAllListings, error]);

//     // ✅ Filter listings locally by category (case-insensitive)
//     const filteredListings = useMemo(() => {
//         if (!categoryName) return listings;

//         return listings.filter((item) => {
//             const categoryValue =
//                 item.categoryName?.toLowerCase?.() ||
//                 item.category?.toLowerCase?.() ||
//                 item.category?.name?.toLowerCase?.() ||
//                 "";

//             return categoryValue === categoryName.toLowerCase();
//         });
//     }, [categoryName, listings]);

//     const latestListings = useMemo(() => {
//         return [...filteredListings]
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//             .slice(0, 5);
//     }, [filteredListings]);

//     return (
//         <>
//             {loading && <Loader />}
//             {/* Hero Section */}
//             <section className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px] flex items-center justify-center overflow-hidden">
//                 {/* Background Image */}
//                 <img
//                     src="https://ctsdemo.com/odishabiz-website/assets/images/Finance_Banking.jpg"
//                     alt="Background Image"
//                     loading="lazy"
//                     className="absolute inset-0 w-full h-full object-cover"
//                 />

//                 {/* Black Overlay */}
//                 <div className="absolute inset-0 bg-black/50" />

//                 {/* Content */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7 }}
//                     className="relative z-10 text-center text-white px-4"
//                 >
//                     <p className="text-sm sm:text-base text-gray-200 mb-2 tracking-wide">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                     </p>
//                     <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-wide drop-shadow-lg">
//                         Top 10  {categoryName} Companies
//                     </h1>
//                 </motion.div>
//             </section>
//             <div className="max-w-[1400px] mx-auto px-6 py-12 lg:flex lg:gap-12">
//                 {/* Left - Blogs */}
//                 <div className="lg:w-2/3 space-y-12">
//                     {
//                         filteredListings.length === 0 ? (
//                             <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg border border-gray-200">
//                                 <img
//                                     src="/images/data-not-found.png"
//                                     alt="No products"
//                                     loading="lazy"
//                                     className="w-40 h-40 mb-4 opacity-80"
//                                 />
//                                 <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
//                                 <p className="text-gray-500 text-sm mt-1">
//                                     Try checking another category or come back later.
//                                 </p>
//                             </div>
//                         ) : (

//                             filteredListings.map((product, idx) => (
//                                 <div
//                                     key={idx}
//                                     id={product._id}
//                                     className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
//                                 >
//                                     <img
//                                         src={
//                                             product.imageUrl
//                                                 ? product.imageUrl
//                                                 : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
//                                         }
//                                         alt={product.title || "Product image"}
//                                         className="w-full h-76 object-cover rounded-lg"
//                                         loading="lazy"
//                                     />

//                                     <div className="p-6 space-y-5">
//                                         {/* Header */}
//                                         <div className="flex items-center justify-between">
//                                             <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                                                 <Building2 className="w-5 h-5 text-yellow-600" />
//                                                 {product.title}
//                                             </h2>

//                                             <Badge
//                                                 variant="secondary"
//                                                 className="bg-blue-500 text-white dark:bg-blue-600"
//                                             >
//                                                 <CheckCircle className="h-3.5 w-3.5 text-white" />
//                                                 {product.category}
//                                             </Badge>

//                                         </div>

//                                         {/* Description */}
//                                         <p className="text-gray-700 text-sm leading-relaxed text-justify">
//                                             {product.description}
//                                         </p>

//                                         {/* Contact & Location */}
//                                         <div className="border-t border-gray-100 pt-4 flex flex-wrap items-center gap-6 text-sm text-gray-700">
//                                             {/* Email */}
//                                             <div className="flex items-center gap-2">
//                                                 <Mail className="w-4 h-4 text-blue-600" />
//                                                 <span className="truncate ">{product.email || "Not Provided"}</span>
//                                             </div>

//                                             {/* Phone */}
//                                             <div className="flex items-center gap-2">
//                                                 <Phone className="w-4 h-4 text-green-600" />
//                                                 <span>{product.phone || "Not Provided"}</span>
//                                             </div>

//                                             {/* Location */}
//                                             {product.address && (
//                                                 <div className="flex items-center gap-2">
//                                                     <MapPin className="w-4 h-4 text-red-600" />
//                                                     <span>
//                                                         {product.address.city}, {product.address.state}{" "}
//                                                         <span className="text-gray-500">(Pin: {product.address.pincode})</span>
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Social Media */}
//                                         <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                                             {/* Left side - Social icons */}
//                                             <div className="flex gap-3">
//                                                 <TooltipProvider>
//                                                     {product.socialMedia?.facebook && (
//                                                         <Tooltip>
//                                                             <TooltipTrigger asChild>
//                                                                 <a
//                                                                     href={product.socialMedia.facebook}
//                                                                     target="_blank"
//                                                                     rel="noreferrer"
//                                                                     className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
//                                                                 >
//                                                                     <FaFacebookF size={12} />
//                                                                 </a>
//                                                             </TooltipTrigger>
//                                                             <TooltipContent>
//                                                                 <p>Visit Facebook</p>
//                                                             </TooltipContent>
//                                                         </Tooltip>
//                                                     )}

//                                                     {product.socialMedia?.instagram && (
//                                                         <Tooltip>
//                                                             <TooltipTrigger asChild>
//                                                                 <a
//                                                                     href={product.socialMedia.instagram}
//                                                                     target="_blank"
//                                                                     rel="noreferrer"
//                                                                     className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white transition-all"
//                                                                 >
//                                                                     <FaInstagram size={12} />
//                                                                 </a>
//                                                             </TooltipTrigger>
//                                                             <TooltipContent>
//                                                                 <p>Visit Instagram</p>
//                                                             </TooltipContent>
//                                                         </Tooltip>
//                                                     )}

//                                                     {product.socialMedia?.twitter && (
//                                                         <Tooltip>
//                                                             <TooltipTrigger asChild>
//                                                                 <a
//                                                                     href={product.socialMedia.twitter}
//                                                                     target="_blank"
//                                                                     rel="noreferrer"
//                                                                     className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
//                                                                 >
//                                                                     <FaXTwitter size={12} />
//                                                                 </a>
//                                                             </TooltipTrigger>
//                                                             <TooltipContent>
//                                                                 <p>Visit Twitter / X</p>
//                                                             </TooltipContent>
//                                                         </Tooltip>
//                                                     )}

//                                                     {product.socialMedia?.linkedin && (
//                                                         <Tooltip>
//                                                             <TooltipTrigger asChild>
//                                                                 <a
//                                                                     href={product.socialMedia.linkedin}
//                                                                     target="_blank"
//                                                                     rel="noreferrer"
//                                                                     className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
//                                                                 >
//                                                                     <FaLinkedin size={12} />
//                                                                 </a>
//                                                             </TooltipTrigger>
//                                                             <TooltipContent>
//                                                                 <p>Visit LinkedIn</p>
//                                                             </TooltipContent>
//                                                         </Tooltip>
//                                                     )}

//                                                     {product.socialMedia?.website && (
//                                                         <Tooltip>
//                                                             <TooltipTrigger asChild>
//                                                                 <a
//                                                                     href={product.socialMedia.website}
//                                                                     target="_blank"
//                                                                     rel="noreferrer"
//                                                                     className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
//                                                                 >
//                                                                     <FaGlobe className="w-3.5 h-3.5" />
//                                                                 </a>
//                                                             </TooltipTrigger>
//                                                             <TooltipContent>
//                                                                 <p>Visit Website</p>
//                                                             </TooltipContent>
//                                                         </Tooltip>
//                                                     )}
//                                                 </TooltipProvider>
//                                             </div>

//                                             {/* Right side - View Details Button */}
//                                             <Link
//                                                 to={`/listing-details/${product.slug}`}
//                                                 className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-medium shadow-md px-4 py-2 transition-all duration-200 hover:shadow-lg active:scale-95"
//                                             >
//                                                 View Details
//                                                 <ArrowRight className="w-4 h-4" />
//                                             </Link>
//                                         </div>

//                                     </div>
//                                 </div>
//                             )))}

//                 </div>

//                 {/* Right - Latest Listings */}
//                 <div className="lg:w-1/3 mt-12 lg:mt-0 lg:sticky lg:top-24 self-start">

//                     <h3 className="text-2xl font-semibold text-gray-900 mb-6">Latest Listings</h3>
//                     <div className="space-y-5">

//                         {latestListings.map((b, idx) => (
//                             <a
//                                 key={idx}
//                                 href={`#${b._id}`}
//                                 className="block group"
//                             >
//                                 <div className="flex items-center gap-4 p-1 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:bg-linear-to-r hover:from-white/90 hover:to-blue-50">

//                                     {/* Image */}
//                                     <div className="relative w-18 h-18 shrink-0">
//                                         <img
//                                             src={
//                                                 b.imageUrl
//                                                     ? b.imageUrl
//                                                     : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
//                                             }
//                                             alt={b.title}
//                                             loading="lazy"
//                                             className="w-18 h-18 object-cover rounded-full border-2 border-blue-100"
//                                         />
//                                         <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                     </div>

//                                     {/* Content */}
//                                     <div className="flex-1">
//                                         <div className="flex items-center justify-between gap-2 flex-wrap">
//                                             <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-base leading-tight">
//                                                 {b.title}
//                                             </h4>
//                                             <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full shadow-sm">
//                                                 {new Date(b.createdAt).toLocaleDateString("en-GB", {
//                                                     day: "2-digit",
//                                                     month: "short",
//                                                     year: "numeric",
//                                                 })}
//                                             </span>
//                                         </div>
//                                         <p className="text-gray-600 text-sm mt-1 text-justify leading-snug line-clamp-2">
//                                             {b.description}
//                                         </p>
//                                     </div>

//                                     {/* Arrow Icon */}
//                                     <div className="text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-2 transition-all duration-300">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             strokeWidth={2}
//                                             stroke="currentColor"
//                                             className="w-5 h-5"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 d="M17.25 8.25L21 12l-3.75 3.75M21 12H3"
//                                             />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </a>
//                         ))}

//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// };

// export default CategoryPage;






import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useResultStore } from "@/store/useResultStore";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGlobe,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa6";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Loader from "@/components/Loader";
import DealPopup from "../components/DealPopup";

export default function CategoryPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  //   const initialDistrict = params.get("district") || "Khordha";
  const [district, setDistrict] = useState("Khordha"); // default district
  const [selectedDistrict, setSelectedDistrict] = useState("Khordha");

  const category = params.get("category")
    ? decodeURIComponent(params.get("category"))
    : "";

  const { mainListings, related, loading, fetchResults } = useResultStore();

  const districts = ["Khordha", "Cuttack"];

  // fetch location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const detectedDistrict = data.address.state_district || "Khordha";

            console.log("Detected District:", detectedDistrict);
            setDistrict(detectedDistrict);
            setSelectedDistrict(detectedDistrict);
          } catch (err) {
            console.error("Error fetching district:", err);
          }
        },
        (err) => {
          console.warn("Geolocation denied or failed:", err);
        }
      );
    }
  }, []);

  // Fetch results when district or category changes
  useEffect(() => {
    if (district && category) {
      fetchResults(district, category);

      const searchParams = new URLSearchParams();
      searchParams.set("category", category);
      searchParams.set("district", district);
      navigate(`/category?${searchParams.toString()}`, { replace: true });
    }
  }, [district, category]);

  // Badge colors
  const badgeColors = [
    "from-indigo-500 to-blue-500",
    "from-pink-500 to-red-400",
    "from-green-600 to-teal-400",
    "from-yellow-400 to-orange-400",
    "from-purple-600 to-rose-400",
    "from-fuchsia-500 to-cyan-400",
  ];
  const getBadgeColor = (cat) => {
    let idx =
      cat && cat.length > 0
        ? cat
            .split("")
            .map((c) => c.charCodeAt(0))
            .reduce((a, b) => a + b, 0) % badgeColors.length
        : 0;
    return badgeColors[idx];
  };

  // Handle district filter button
  const handleFilter = () => {
    setDistrict(selectedDistrict);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {loading && <Loader />}

      {/* --- Top Section --- */}
      <div className="px-6 md:px-16 mb-0 flex flex-col md:flex-row items-center justify-between gap-4 z-40 transition-all duration-300  w-full bg-gray-100 py-2 shadow-md ">
       
        {/* Left: Title */}
        <h2
          className={`transition-all duration-300 text-gray-900 font-bold ${
            isSticky ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
          }`}
        >
          Top 10 <span className="text-green-600">{category || "Items"}</span>{" "}
          in <span className="text-blue-600">{district}</span>
        </h2>

        {/* Right: District Select + Button */}
        <div className="flex items-center gap-2  ">
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict} >
            <SelectTrigger
              className={`transition-all duration-300 w-40 h-9 ${
                isSticky ? "text-sm" : "text-sm md:text-base h-10"
              } border border-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 rounded-md`}
            >
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent className="text-sm">
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="sm"
            className={`transition-all duration-300 ${
              isSticky
                ? "bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm h-9"
                : "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm h-10"
            }`}
            onClick={handleFilter}
          >
          Your District
          </Button>
        </div>
      </div>




      <div className="flex flex-col md:flex-row gap-10 py-4 px-14 w-full min-h-screen bg-gray-100">
        {/* Main Listings */}
        <section className="flex-1 flex flex-col gap-8">
          {mainListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg border border-gray-200">
              <img
                src="/images/data-not-found.png"
                alt="No products"
                loading="lazy"
                className="w-40 h-40 mb-4 opacity-80"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                No Listing Found
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Try checking another category or come back later.
              </p>
            </div>
          ) : (
            mainListings.map((item, idx) => (
              <Card
                key={idx}
                className="rounded-xs border border-muted bg-white shadow-sm p-5 flex flex-col transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
              >
                <div className="flex flex-col md:flex-row items-start gap-4">
                  {/* Image */}
                  <div className="w-full md:w-44 h-40 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            className={`capitalize px-3 py-0.5 text-xs mb-2 text-white border-0 shadow-md cursor-pointer ${getBadgeColor(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Category: {item.category}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Title + Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-black">
                          {idx + 1}.
                        </span>
                        <h2 className="text-2xl font-semibold text-neutral-900">
                          {item.title}
                        </h2>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 bg-[#007A0C] text-white px-2.5 py-0.5 rounded-full text-sm font-medium shadow-sm cursor-default">
                              <FaStar className="text-white" />
                              <span>
                                {(Math.random() * (5 - 3.5) + 3.5).toFixed(1)}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average user rating</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <Separator className="mb-2" />
                    <p className="text-muted-foreground text-sm text-justify">
                      {item.description}
                    </p>

                    {/* Contact */}
                    <div className="mt-4 flex flex-col gap-3 text-sm">
                      {item.phone && (
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                            <Phone className="w-4 h-4" />
                          </div>
                          <span className="text-neutral-600">{item.phone}</span>
                        </div>
                      )}
                      {item.email && (
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-neutral-600">{item.email}</span>
                        </div>
                      )}
                      {item.address && (
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 shadow-sm">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="text-neutral-600">
                            {item.address.district}, {item.address.state} -{" "}
                            {item.address.pincode}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social + WhatsApp */}
                <div className="flex items-center justify-between mt-4 pl-1">
                  {/* Left: Social Icons (aligned under contact details) */}
                  <div className="flex items-center gap-3 ml-48">
                    {[
                      {
                        icon: FaFacebookF,
                        color: "bg-blue-600",
                        url: item.socialMedia?.facebook,
                        label: "Facebook",
                      },
                      {
                        icon: FaInstagram,
                        color: "bg-gradient-to-tr from-pink-500 to-orange-400",
                        url: item.socialMedia?.instagram,
                        label: "Instagram",
                      },
                      {
                        icon: FaTwitter,
                        color: "bg-sky-500",
                        url: item.socialMedia?.twitter,
                        label: "Twitter",
                      },
                      {
                        icon: FaLinkedinIn,
                        color: "bg-blue-700",
                        url: item.socialMedia?.linkedin,
                        label: "LinkedIn",
                      },
                      {
                        icon: FaGlobe,
                        color: "bg-gray-700",
                        url: item.socialMedia?.website,
                        label: "Website",
                      },
                    ].map(
                      (soc, i) =>
                        soc.url && (
                          <TooltipProvider key={i}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={soc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`${soc.color} w-6 h-6 flex items-center justify-center rounded-full text-white transition-all hover:brightness-125 hover:scale-105 shadow-md`}
                                >
                                  <soc.icon className="text-sm" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{soc.label}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )
                    )}
                  </div>

                  {/* Right: WhatsApp Button (icon animated only) */}
                  {item.phone && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-[#007A0C] hover:bg-green-900 text-white font-semibold gap-2 rounded-md px-5 shadow-md flex items-center"
                    >
                      <a
                        href={`https://wa.me/${item.phone.replace(
                          /[^0-9]/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, -10, 10, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="inline-flex"
                        >
                          <FaWhatsapp className="text-white text-lg" />
                        </motion.span>
                        <span className="ml-1">WhatsApp</span>
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </section>

        {/* Sidebar */}
        <aside className="w-full md:w-72 mt-8 md:mt-0">
          <div className="md:sticky md:top-18 flex flex-col gap-6">
            {/* Related */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-800">
                  Related Categories
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  {related.length}
                </span>
              </div>

              <ul className="flex flex-col divide-y divide-gray-100 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {related.length === 0 ? (
                  <li className="px-4 py-3 text-muted-foreground text-sm">
                    No related categories found.
                  </li>
                ) : (
                  related.map((cat, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/category?district=${district}&category=${encodeURIComponent(
                          cat
                        )}`}
                        className="block px-4 py-2.5 text-neutral-700 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium transition-all"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Sponsored */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-2">
              <h4 className="text-sm text-neutral-600 font-medium mb-2 px-2">
                Sponsored
              </h4>
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl"
              >
                <img
                  src="https://akam.cdn.jdmagicbox.com/images/icontent/analytics/Google_ads_banner_300x250_17_06_2025.png"
                  alt="Advertisement"
                  className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </aside>
      </div>
      <DealPopup />
    </>
  );
}
