import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchHeader() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [district, setDistrict] = useState(params.get("district") || "");
  const [query, setQuery] = useState(params.get("category") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

  const fetchSuggestions = useCallback(
    debounce(async (q, district) => {
      if (!q || !district) return setSuggestions([]);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/auth/search-suggestions?q=${q}&district=${district}`
        );
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(query, district);
    return () => fetchSuggestions.cancel();
  }, [query, district, fetchSuggestions]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!district || !query) return;
    navigate(
      `/results?district=${encodeURIComponent(
        district
      )}&category=${encodeURIComponent(query)}`
    );
  };

  return (
    <div
      className={`${
        isSticky
          ? "fixed top-16 left-0 w-full z-40 bg-gray-100 border-b border-gray-200  transition-all duration-300 py-0"
          : "relative bg-gray-100  border-gray-200  py-0"
      }`}
      // 👆 Adjust top-[64px] to your main header height (e.g., 56px or 72px)
    >
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center  gap-3 px-0 ${
          isSticky ? "py-1" : "py-2"
        } transition-all duration-300`}
      >
        {/* --- Left Column --- */}
        <div className="flex flex-col gap-1">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList className="flex flex-wrap gap-1 text-xs md:text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-blue-600 hover:underline">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {district && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        to={`/results?district=${district}`}
                        className="capitalize text-gray-700 hover:text-blue-600"
                      >
                        {district}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize text-gray-800 font-medium">
                  {query || "Search"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* --- Right Column: Search Form --- */}
        <form
          onSubmit={handleSubmit}
          className={`relative flex items-center justify-end gap-1.5 bg-white border border-gray-200 rounded-full px-2 shadow-sm ${
            isSticky ? "py-0.5" : "py-1"
          } transition-all duration-300 w-fit max-w-[260px] md:max-w-[320px] mx-auto`}
        >
          {/* District Dropdown */}
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="w-[90px] md:w-[110px] h-6 md:h-7 text-[11px] md:text-xs bg-transparent border-none shadow-none focus:ring-0 focus:outline-none text-black">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent className="text-[11px] md:text-xs">
              <SelectItem value="Khordha">Khordha</SelectItem>
              <SelectItem value="Cuttack">Cuttack</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-4 mx-1" />

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-[11px] md:text-xs text-gray-700 focus:outline-none placeholder-gray-400 w-20 md:w-28"
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 top-6 w-full bg-white border border-gray-200 rounded-md shadow-lg  text-xs z-0">
                {suggestions.map((cat, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setQuery(cat);
                      setSuggestions([]);
                    }}
                    className="px-2 py-1 hover:bg-blue-50 cursor-pointer"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button
            type="submit"
            size="sm"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] md:text-xs font-medium px-2.5 py-0.5"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
