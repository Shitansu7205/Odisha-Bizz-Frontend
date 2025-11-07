// // pages/ResultsPage.jsx
// import { useEffect } from "react";
// import { useResultStore } from "../store/useResultStore";
// import { useSearchParams, Link } from "react-router-dom";
// import { Facebook, Instagram, Twitter, Linkedin, Globe } from "lucide-react";

// export default function ResultsPage() {
//   const [params] = useSearchParams();
//   const district = params.get("district") || "";
//   const category = params.get("category")
//     ? decodeURIComponent(params.get("category"))
//     : "";

//   const { mainListings, related, loading, fetchResults, normalize } =
//     useResultStore();

//   useEffect(() => {
//     if (district && category) {
//       fetchResults(district, category);
//     }
//   }, [district, category]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         {" "}
//         <p className="text-gray-600 text-lg animate-pulse">
//           Loading results...
//         </p>{" "}
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
//       {/* Left: Main Listings */}
//       <div className="flex-1 space-y-6">
//         {mainListings.map((item) => (
//           <div
//             key={item._id}
//             className="flex flex-col md:flex-row border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden"
//           >
//             {" "}
//             {/* Left: Text info */}
//             <div className="flex-1 p-6 flex flex-col justify-between">
//               {" "}
//               <div>
//                 {" "}
//                 {/* Category Badge */}
//                 <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-2">
//                   {" "}
//                   {item.category}{" "}
//                 </span>
//                 {/* Title */}{" "}
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-all">
//                   {" "}
//                   {item.title}{" "}
//                 </h3>
//                 {/* Rating */}{" "}
//                 {item.rating && (
//                   <div className="flex items-center mb-2">
//                     {" "}
//                     {[...Array(5)].map((_, i) => (
//                       <span
//                         key={i}
//                         className={`${
//                           i < item.rating ? "text-yellow-400" : "text-gray-300"
//                         }`}
//                       >
//                         {" "}
//                         ★{" "}
//                       </span>
//                     ))}{" "}
//                   </div>
//                 )}
//                 {/* Short Description */}{" "}
//                 <p className="text-gray-600 text-sm line-clamp-2 mb-3">
//                   {item.description}
//                 </p>
//                 {/* Contact Info */}{" "}
//                 <div className="flex flex-col gap-1 mb-3 text-gray-700 text-sm">
//                   {" "}
//                   {item.email && (
//                     <p>
//                       <strong>Email:</strong> {item.email}
//                     </p>
//                   )}{" "}
//                   {item.phone && (
//                     <p>
//                       <strong>Phone:</strong> {item.phone}
//                     </p>
//                   )}{" "}
//                   {item.address && (
//                     <p>
//                       {" "}
//                       <strong>Address:</strong> {item.address.district},{" "}
//                       {item.address.state} - {item.address.pincode}{" "}
//                     </p>
//                   )}{" "}
//                 </div>{" "}
//               </div>
//               {/* Buttons */}{" "}
//               <div className="flex flex-wrap gap-3 mt-3">
//                 {" "}
//                 <Link
//                   to={`/listing/${item._id}`}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-all"
//                 >
//                   {" "}
//                   View More{" "}
//                 </Link>{" "}
//                 <a
//                   href={`mailto:${item.email}`}
//                   className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm transition-all"
//                 >
//                   {" "}
//                   Contact{" "}
//                 </a>{" "}
//               </div>
//               {/* Social Media */}{" "}
//               <div className="flex items-center gap-3 mt-3 text-gray-500">
//                 {" "}
//                 {item.socialMedia?.facebook && (
//                   <a
//                     href={item.socialMedia.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {" "}
//                     <Facebook className="w-5 h-5 hover:text-blue-600 transition-all" />{" "}
//                   </a>
//                 )}{" "}
//                 {item.socialMedia?.instagram && (
//                   <a
//                     href={item.socialMedia.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {" "}
//                     <Instagram className="w-5 h-5 hover:text-pink-500 transition-all" />{" "}
//                   </a>
//                 )}{" "}
//                 {item.socialMedia?.twitter && (
//                   <a
//                     href={item.socialMedia.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {" "}
//                     <Twitter className="w-5 h-5 hover:text-blue-400 transition-all" />{" "}
//                   </a>
//                 )}{" "}
//                 {item.socialMedia?.linkedin && (
//                   <a
//                     href={item.socialMedia.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {" "}
//                     <Linkedin className="w-5 h-5 hover:text-blue-700 transition-all" />{" "}
//                   </a>
//                 )}{" "}
//                 {item.socialMedia?.website && (
//                   <a
//                     href={item.socialMedia.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {" "}
//                     <Globe className="w-5 h-5 hover:text-green-600 transition-all" />{" "}
//                   </a>
//                 )}{" "}
//               </div>
//             </div>
//             {/* Right: Image */}{" "}
//             <div className="md:w-56 w-full shrink-0 relative">
//               {" "}
//               {item.imageUrl ? (
//                 <img
//                   src={item.imageUrl}
//                   alt={item.title}
//                   className="w-full h-full object-cover rounded-r-xl"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
//                   {" "}
//                   No Image{" "}
//                 </div>
//               )}{" "}
//             </div>
//           </div>
//         ))}{" "}
//       </div>

//       {/* Right: Related Categories */}
//       <aside className="w-full md:w-1/3 bg-white rounded-xl shadow-md p-6 h-fit">
//         {" "}
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">
//           Related Categories
//         </h3>{" "}
//         {related.length === 0 ? (
//           <p className="text-gray-500 text-sm">No related categories found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {" "}
//             {related.map((cat) => (
//               <li key={cat}>
//                 {" "}
//                 <Link
//                   to={`/results?district=${district}&category=${encodeURIComponent(
//                     cat
//                   )}`}
//                   className="block w-full text-left bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg px-4 py-2 transition-all duration-200"
//                 >
//                   {" "}
//                   {cat}{" "}
//                 </Link>{" "}
//               </li>
//             ))}{" "}
//           </ul>
//         )}
//       </aside>
//     </div>
//   );
// }

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useResultStore } from "../store/useResultStore";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaGlobe,
  FaArrowRight,
  FaWhatsapp,
  FaTwitter,
  FaLinkedinIn,
  FaStar,
} from "react-icons/fa6";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import SearchHeader from "../components/SearchHeader"

export default function ResultsPage() {
  const [params] = useSearchParams();
  const district = params.get("district") || "";
  const category = params.get("category")
    ? decodeURIComponent(params.get("category"))
    : "";

  const { mainListings, related, loading, fetchResults } = useResultStore();

  useEffect(() => {
    if (district && category) {
      fetchResults(district, category);
    }
  }, [district, category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground text-lg animate-pulse">
          Loading results...
        </p>
      </div>
    );
  }

  // category color mapping for badges
  const badgeColors = [
    "from-indigo-500 to-blue-500",
    "from-pink-500 to-red-400",
    "from-green-600 to-teal-400",
    "from-yellow-400 to-orange-400",
    "from-purple-600 to-rose-400",
    "from-fuchsia-500 to-cyan-400",
  ];

  const getBadgeColor = (category) => {
    let idx =
      category && category.length > 0
        ? category
            .split("")
            .map((c) => c.charCodeAt(0))
            .reduce((a, b) => a + b, 0) % badgeColors.length
        : 0;
    return badgeColors[idx];
  };
  return (
    <>
  <SearchHeader />

      <div className="flex flex-col md:flex-row gap-10 py-8 px-18 w-full min-h-screen bg-gray-100">
        {/* Main Listings */}
        <section className="flex-1 flex flex-col gap-8">
          {mainListings.map((item) => (
            <Card className="rounded-xs border border-muted bg-white shadow-sm p-5 flex flex-col transition-all duration-300 hover:shadow-md hover:scale-[1.01] ">
              {/* Top Row: Image + Basic Info */}
              <div className="flex flex-col md:flex-row items-start gap-4">
                {/* Left: Image */}
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

                {/* Right: Title + Category + Description */}
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

                  {/* Title + Rating Row */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Left side — index + title */}
                    <div className="flex items-center gap-2">
                      {/* Index Number */}
                      <span className="text-lg font-bold text-black">
                        {mainListings.indexOf(item) + 1}.
                      </span>

                      {/* Title */}
                      <h2 className="text-2xl font-semibold text-neutral-900">
                        {item.title}
                      </h2>
                    </div>

                    {/* Right side — Rating Badge */}
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

                  {/* Contact Details just below description */}
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    {item.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-medium text-neutral-800"></span>{" "}
                          <span className="text-neutral-600">{item.phone}</span>
                        </div>
                      </div>
                    )}

                    {item.email && (
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-medium text-neutral-800"></span>{" "}
                          <span className="text-neutral-600">{item.email}</span>
                        </div>
                      </div>
                    )}

                    {item.address && (
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 shadow-sm">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="text-neutral-600">
                          <span className="font-medium text-neutral-800"></span>{" "}
                          {item.address.district}, {item.address.state} -{" "}
                          {item.address.pincode}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Icons + WhatsApp */}
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
          ))}
        </section>
        {/* Right Sidebar */}

        <aside className="w-full md:w-72 mt-8 md:mt-0">
          <div className="md:sticky md:top-28 flex flex-col gap-6">
            {/* Related Categories */}
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
                        to={`/results?district=${district}&category=${encodeURIComponent(
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

            {/* Sponsored Ad / Banner */}
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
    </>
  );
}
