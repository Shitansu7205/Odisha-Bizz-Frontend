import {
  MapPin,
  Phone,
  CheckCircle2,
  Star,
  ShieldCheck,
  Verified,
  ParkingCircle,
  Clock,
  ArrowRight,
  MessageCircle,
  Share2,
  Edit3,
  Mail,
  Globe,
  Copy,
  Navigation,
  PenLine,
  ChevronDown,
  Store,
  ArrowRightCircle,
  ThumbsUp, MoreVertical
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import SimilarProducts from "../components/SimilarProducts";
import Loader from "@/components/Loader";
import SocialShare from "../components/SocialShare";
import DealPopup from "../components/DealPopup";

export default function VenueDetails() {
  const API = import.meta.env.VITE_BACKEND_API_URL;

  const [activeTab, setActiveTab] = useState("overview");
  const { slug } = useParams();


  const [listing, setListing] = useState(null);
  const [comments, setComments] = useState([]);


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveTab(id);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/get-listing/${slug}`);
        if (res.status === 200) {
          setListing(res.data.listing);
          setComments(res.data.comments || []);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchData();
  }, [slug, API]);

  if (!listing) return <Loader />


  return (
    <>
      <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10">
        <div className="max-w-7xl mx-auto bg-white rounded-sm shadow-md overflow-hidden">
          {/* IMAGES SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Main"
              className="md:col-span-2 lg:col-span-3 h-72 md:h-97 object-cover w-full"
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              {[
                "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="object-cover h-36 md:h-48 w-full"
                />
              ))}
              <div className="relative h-36 md:h-48">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-semibold">
                  +125 More
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="grid lg:grid-cols-3 gap-8 p-6 md:p-10">
            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-2 space-y-5">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                  {listing.title}
                </h1>
                <div className="relative group">
                  {/* Main Share Button */}
                  <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200">
                    <Share2 className="w-4 h-4" /> Share
                  </button>

                  {/* Social icons - visible on hover */}
                  <div className="absolute top-full mt-2 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 bg-white border border-gray-200 rounded-lg shadow p-2">
                    <SocialShare
                      title={listing.title}
                      url={`http://localhost:5173/listing-details/${listing.slug}`}
                    />
                  </div>
                </div>

              </div>



              {/* Rating Section */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                  <Star className="w-4 h-4 mr-1 text-green-600" /> 4.5
                </div>
                <span className="text-gray-600">6,247 Ratings</span>
                <ShieldCheck className="text-yellow-500 w-4 h-4" />
                <span className="text-gray-700 font-medium">Trust</span>
                <Verified className="text-blue-500 w-4 h-4" />
                <span className="text-gray-700 font-medium">Verified</span>
                <CheckCircle2 className="text-gray-500 w-4 h-4" />
                <span className="text-gray-700 font-medium">Claimed</span>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" /> {listing.address.city}, {listing.address.state} , {listing.address.pincode}
                </div>
                <span>• 1.52 km</span>
                <div className="flex items-center gap-1 text-green-600">
                  <Clock className="w-4 h-4" /> Open until 10:00 pm
                </div>
                <span>• 9 Years in Business</span>
                <div className="flex items-center gap-1">
                  <ParkingCircle className="w-4 h-4 text-pink-600" /> Parking Available
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-3">
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-medium text-sm shadow-sm">
                  <Phone className="w-4 h-4" /> {listing.phone}
                </button>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium text-sm shadow-sm">
                  Enquire Now
                </button>
                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-medium text-sm shadow-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
              </div>

              {/* Tabs */}
              <div className="border-t flex flex-wrap items-center gap-6 pt-4 text-gray-700 text-sm font-medium">
                {["overview", "quickinfo", "services", "photos", "explore", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => scrollToSection(tab)}
                      className={`pb-1 transition-colors duration-200 ${activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "hover:text-blue-600"
                        }`}
                    >
                      {tab === "quickinfo"
                        ? "Quick Info"
                        : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>

              {/* SCROLLABLE SECTIONS */}
              <div id="overview" className="pt-8 space-y-4 scroll-mt-28">
                <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  {listing.description}
                </p>
              </div>

              <div id="quickinfo" className="pt-8 space-y-4 scroll-mt-28">
                <h2 className="text-xl font-semibold text-gray-900">Quick Info</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Details about amenities, pricing, and more.
                </p>
              </div>

              <div id="services" className="pt-8 space-y-4 scroll-mt-28">
                <h2 className="text-xl font-semibold text-gray-900">Services</h2>
                <ul className="list-disc ml-6 text-gray-600 text-sm">
                  <li>Catering</li>
                  <li>Decoration</li>
                  <li>Event Management</li>
                </ul>
              </div>

              <div id="photos" className="pt-8 space-y-4 scroll-mt-28">
                <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
                <p className="text-gray-600 text-sm">Gallery coming soon...</p>
              </div>

              <div id="explore" className="pt-8 space-y-4 scroll-mt-28">
                <h2 className="text-xl font-semibold text-gray-900">Explore</h2>
                <p className="text-gray-600 text-sm">
                  Explore nearby hotels and services.
                </p>
              </div>

              <div id="reviews" className="pt-8 space-y-6 scroll-mt-28">
                {/* Header with title + button side-by-side */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">User Reviews</h2>
                  <CommentSection listingId={listing._id} />
                </div>

                {comments.length === 0 ? (
                  <p className="text-gray-600 text-sm">User reviews will appear here.</p>
                ) : (
                  comments.map((comment, idx) => (
                    <div
                      key={idx}
                      className="border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition duration-300"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={comment.user?.avatar || "/images/users.png"}
                            alt={comment.user?.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {comment.user?.name || "Anonymous"}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {comment.user?.reviewCount
                                ? `${comment.user.reviewCount} reviews`
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                          <MoreVertical size={16} className="text-gray-400" />
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < (comment.rating || 5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>

                      {/* Tags */}
                      {comment.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {comment.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Comment Text */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        {comment.text}
                      </p>

                      {/* Footer Buttons */}
                      <div className="flex items-center gap-5 text-gray-500 text-sm">
                        <button className="flex items-center gap-1 hover:text-black">
                          <ThumbsUp size={16} /> Helpful
                        </button>
                        <button className="flex items-center gap-1 hover:text-black">
                          <MessageCircle size={16} /> Comment
                        </button>
                        <button className="flex items-center gap-1 hover:text-black">
                          <Share2 size={16} /> Share
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* RIGHT SIDE (STICKY) */}
            <div className="space-y-6 lg:sticky lg:top-20 self-start h-fit">
              {/* Contact Card */}
              <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg border-b pb-2">Contact Information</h3>

                {/* Phone */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>
                  <a href={`tel:${listing.phone}`} className="text-blue-600 font-medium hover:underline">
                    {listing.phone}
                  </a>
                </div>

                {/* Address */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Address</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {listing.address.city}, {listing.address.state}, {listing.address.pincode}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 flex justify-between text-sm font-medium">
                  <button className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Navigation className="w-5 h-5" /> Get Directions
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Copy className="w-5 h-5" /> Copy
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 flex flex-col gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600" /> Opens in 27 mins
                  </div>
                  <div className="flex items-center gap-3 text-blue-600 cursor-pointer hover:underline">
                    <PenLine className="w-5 h-5" /> Suggest New Timings
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" /> {listing.email}
                  </div>
                  <div className="flex items-center gap-3">
                    <Store className="w-5 h-5 text-gray-500" /> Get info via SMS/Email
                  </div>
                  <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <Share2 className="w-5 h-5 text-gray-500" /> Share
                  </div>
                  <div className="flex items-center gap-3 text-yellow-600 cursor-pointer hover:text-yellow-700">
                    <ArrowRightCircle className="w-5 h-5" /> Tap to rate
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-blue-600">
                    <Edit3 className="w-5 h-5" /> Edit this Listing
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />{" "}
                    {listing.socialMedia.website || "No website"}
                  </div>
                </div>

                {/* Follow Us */}
                <div className="pt-3 mt-3 border-t flex items-center gap-2 text-sm text-gray-600">
                  <ChevronDown className="w-5 h-5 text-blue-500" /> Follow us
                </div>

                {/* GST */}
                <p className="text-xs text-gray-500 mt-2">GSTIN: 21AHAPP9958P1ZM</p>
              </div>

              {/* Lead Form */}
              <div className="border rounded-2xl p-6 shadow-sm bg-white">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                  Get the list of best{" "}
                  <span className="text-blue-600">Cap Retailers</span>
                </h3>
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full border rounded-md p-2.5 text-sm mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Mobile Number*"
                  className="w-full border rounded-md p-2.5 text-sm mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-md font-medium text-sm flex justify-center items-center gap-2">
                  Best Deal <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          <div className="flex justify-center lg:mb-10">
            <SimilarProducts category={listing.category} />
          </div>
        </div>

      </div>
              <DealPopup />
    </>
  );
}
