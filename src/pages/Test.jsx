import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, Facebook, Twitter, Instagram } from "lucide-react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyBlogs = [
      {
        title: "Explore Jibhi Adventures",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "Experience trekking, rivers, and amazing nature in Jibhi.",
        category: "Adventure",
        contact: { email: "info@travel.com", phone: "+91 1234567890" }
      },
      {
        title: "Hidden Waterfalls in Himachal",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
        description: "Discover the serene waterfalls that are perfect for a weekend getaway.",
        category: "Nature",
        contact: { email: "contact@travel.com", phone: "+91 9876543210" }
      },
      {
        title: "Local Culture & Cuisine",
        image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80",
        description: "Taste local delicacies and experience traditional Himachali culture.",
        category: "Culture",
        contact: { email: "hello@travel.com", phone: "+91 1122334455" }
      },
    ];

    setBlogs(dummyBlogs);
    setLoading(false);
  }, []);

  const staticBlogs = [
    { title: "Scenic Mountains", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200&q=80", description: "Beautiful mountain views." },
    { title: "Forest Trails", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80", description: "Peaceful walks in the forest." },
    { title: "Rivers & Lakes", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80", description: "Relax by calm waters." },
    { title: "Adventure Sports", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=200&q=80", description: "Exciting outdoor activities." },
    { title: "Local Cuisine", image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=200&q=80", description: "Tasty traditional food." },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 lg:flex lg:gap-12">
      {/* Left - Blogs */}
      <div className="lg:w-2/3 space-y-12">
        {loading ? (
          <p className="text-gray-500 text-center">Loading blogs...</p>
        ) : (
          blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 transform transition hover:scale-105 duration-300"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-72 object-cover" />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-900">{blog.title}</h2>
                  <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {blog.category}
                  </span>
                </div>
                <p className="text-gray-700 text-lg">{blog.description}</p>

                {/* Contact */}
                {blog.contact && (
                  <p className="text-gray-600">
                    <strong>Contact:</strong> {blog.contact.email} | {blog.contact.phone}
                  </p>
                )}

                {/* Social media */}
                <div className="flex gap-4 mt-2 text-gray-600">
                  <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-700" />
                  <Twitter className="w-6 h-6 cursor-pointer hover:text-blue-500" />
                  <Instagram className="w-6 h-6 cursor-pointer hover:text-pink-600" />
                </div>

                {/* Action buttons */}
                <div className="flex gap-6 mt-4">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-red-500">
                    <Heart /> Like
                  </button>
                  <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                    <MessageCircle /> Comment
                  </button>
                  <button className="flex items-center gap-2 text-gray-700 hover:text-green-500">
                    <Share2 /> Share
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right - Latest Blogs */}
      <div className="lg:w-1/3 mt-12 lg:mt-0">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Latest Blogs</h3>
        <div className="space-y-6">
          {staticBlogs.map((b, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow bg-white/60 backdrop-blur-sm border border-white/20"
            >
              <img src={b.image} alt={b.title} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900">{b.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
