import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { FiSearch } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function HomeSearchHeader() {
  const [district, setDistrict] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const rotatingWords = [
    "Products & Services",
    "Businesses",
    "Shops",
    "Companies",
  ];
  const [index, setIndex] = useState(0);
  const API = import.meta.env.VITE_BACKEND_API_URL;

  // Debounced fetch function
  const fetchSuggestions = useCallback(
    debounce(async (q, district) => {
      if (!q || !district) return setSuggestions([]);
      try {
        const res = await axios.get(
          `${API}/search-suggestions?q=${q}&district=${district}`
        );
        setSuggestions(res.data.suggestions);
      } catch (err) {
        console.error(err);
      }
    }, 300),
    []
  );

  // Trigger search when query or district changes
  useEffect(() => {
    fetchSuggestions(query, district);

    // Cancel debounce on unmount or query/district change
    return () => fetchSuggestions.cancel();
  }, [query, district, fetchSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!district || !query) return;
    window.location.href = `/category?district=${district}&category=${query}`;
  };

  // Rotate every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  // return (
  //   <div className="flex flex-col items-center py-10 bg-white">
  //     <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
  //       Search across{" "}
  //       <span className="text-blue-600 font-bold">5.9 Crore+</span> Products &
  //       Services
  //     </h1>
  //     <form
  //       onSubmit={handleSubmit}
  //       className="flex w-full max-w-3xl border border-gray-300 rounded-md overflow-hidden shadow-sm relative bg-white"
  //     >
  //       {/* Left: District Selector */}
  //       <div className="relative flex items-center w-1/3 border-r border-gray-300 bg-white box-shadow">
  //         <MdLocationOn className="absolute left-3 text-gray-500 text-lg" />
  //         <select
  //           value={district}
  //           onChange={(e) => setDistrict(e.target.value)}
  //           className="appearance-none w-full pl-10 pr-4 py-3 text-gray-700 focus:outline-none"
  //         >
  //           <option value="">Select District</option>
  //           <option value="Khordha">Khordha</option>
  //           <option value="cuttack">Cuttack</option>
  //         </select>
  //       </div>

  //       {/* Right: Search Input */}
  //       <div className="relative flex items-center w-2/3">
  //         <input
  //           type="text"
  //           placeholder="Search for Spa & Salons"
  //           value={query}
  //           onChange={(e) => setQuery(e.target.value)}
  //           className="w-full py-3 px-4 pr-20 text-gray-700 focus:outline-none border border-gray-300 rounded"
  //           onBlur={() => setTimeout(() => setSuggestions([]), 200)} // hide on blur
  //         />
  //         <button
  //           type="submit"
  //           className="absolute right-0 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 flex items-center justify-center"
  //           // className="absolute right-0  text-white px-4 py-3 flex items-center justify-center"
  //         >
  //           <FiSearch className="text-xl mr-2" /> Search
  //         </button>
  //       </div>
  //       {/* Right: Search Input */}
  //     </form>
  //     <div className="relative w-full">
  //       {suggestions.length > 0 && (
  //         <ul className="absolute top-full left-96 mt-1 w-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
  //           <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200">
  //             Trending Searches
  //           </div>
  //           {suggestions.map((cat) => (
  //             <li
  //               key={cat}
  //               onClick={() => setQuery(cat)}
  //               className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
  //             >
  //               {/* Optional icon like your screenshot */}
  //               <div className="shrink-0 w-6 h-6 bg-gray-300 rounded mr-3 flex items-center justify-center text-white text-sm font-bold">
  //                 &#8599;
  //               </div>
  //               <div>
  //                 <p className="text-gray-800 font-semibold text-sm">{cat}</p>
  //                 <p className="text-gray-400 text-xs">Category</p>
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex items-center justify-between flex-row py-2 md:pl-18 md:pt-6 ">
      {/* Left side content */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-gray-800  text-left flex flex-wrap justify-left items-left gap-3">
          Search across
          <span className="text-blue-600 font-bold">5.9 Crore+</span>{" "}
          <div className="relative inline-block min-w-[220px] h-[1.6em] overflow-hidden text-left pt-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute left-0 right-0 text-green-600 font-bold"
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="flex md:w-2xl max-w-3xl border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white transition-all duration-300 hover:shadow-lg"
        >
          {/* District Selector */}
          <div className="relative flex items-center w-1/3 border-r border-gray-200 bg-white">
            <MdLocationOn className="absolute left-3 text-blue-600 text-xl" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="appearance-none w-full pl-10 pr-4 py-3 text-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select District</option>
              <option value="Khordha">Khordha</option>
              <option value="Cuttack">Cuttack</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex items-center w-2/3">
            <input
              type="text"
              placeholder="Search for Spa & Salons"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              className="w-full py-3 px-4 pr-24 text-gray-700 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="absolute right-1 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 flex items-center gap-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FiSearch className="text-lg" />
              Search
            </button>
          </div>
        </form>

        {/* Suggestions Dropdown */}
        <div className="relative w-full">
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 bg-gray-50">
                Trending Searches
              </div>
              {suggestions.map((cat) => (
                <li
                  key={cat}
                  onClick={() => setQuery(cat)}
                  className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                >
                  <div className="shrink-0 w-6 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-sm font-bold">
                    &#8599;
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">{cat}</p>
                    <p className="text-gray-400 text-xs">Category</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right side Downloade Btn */}
      <div className="flex flex-col justify-start items-center  md:pr-18  lg:mt-10">
        <div className="flex justify-center items-center mt-4 ">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => toast.warn("App is coming soon on  Play Store!")}
              className="transition-transform hover:scale-105 focus:outline-none"
            >
              <img
                src="/images/getapp_appstore.avif"
                alt="Download on Google Play"
                className="h-10"
              />
            </button>

            <button
              onClick={() => toast.warn("iOS app coming soon on App Store!")}
              className="transition-transform hover:scale-105 focus:outline-none"
            >
              <img
                src="/images/getapp_googleplay.avif"
                alt="Download on App Store"
                className="h-10"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
