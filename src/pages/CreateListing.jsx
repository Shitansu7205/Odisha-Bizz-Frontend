import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ProductListingForm = () => {
  const API = import.meta.env.VITE_BACKEND_API_URL;
  const [image, setImage] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    email: "",
    phone: "",
    address: {
      district: "",
      state: "",
      pincode: "",
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      website: "",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch all states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(
          "https://www.india-location-hub.in/api/locations/states"
        );
        const data = await res.json();
        if (data.success) setStates(data.data.states);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  // Fetch districts for selected state
  const fetchDistricts = async (stateName) => {
    // setLoading(true);
    setSelectedState(stateName);
    setDistricts([]);
    try {
      const res = await fetch(
        `https://www.india-location-hub.in/api/locations/districts?state=${encodeURIComponent(
          stateName
        )}`
      );
      const data = await res.json();
      if (data.success) setDistricts(data.data.districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true); // ✅ Start loading before request
      try {
        const res = await axios.get(`${API}/check-auth`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setLoading(false);
        }
      } catch (err) {
        toast.error(" unauthorized access!");
        navigate("/admin/login"); //  Redirect to login
      } finally {
        setLoading(false); // stop loader in all cases
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", JSON.stringify(formData.address)); // Convert nested objects
      data.append("socialMedia", JSON.stringify(formData.socialMedia));
      if (image) data.append("image", image); // 👈 image file

      // Send POST request
      const res = await axios.post(`${API}/post-listings`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Listing created successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        email: "",
        phone: "",
        address: { district: "", state: "", pincode: "" },
        socialMedia: {
          facebook: "",
          instagram: "",
          twitter: "",
          linkedin: "",
          website: "",
        },
      });
      setImage(null);
    } catch (err) {
      console.error("Error creating listing:", err);
      toast.error("Failed to create listing!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
        {/* Left Image */}
        <div className="hidden md:flex md:w-1/2 justify-center">
          <img
            src="https://illustrations.popsy.co/gray/product-launch.svg"
            alt="Listing Illustration"
            className="w-4/5 h-auto"
            loading="lazy"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2  shadow-md rounded-lg  bg-white p-[30px]">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Create Your Listings
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-2 max-w-xl mx-auto bg-red"
          >
            <Input
              type="text"
              name="title"
              placeholder="Enter Title of Listing"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="cursor-pointer"
            />

            {image && (
              <div className="mt-4 flex justify-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-32 h-32 rounded-xl object-cover border border-gray-200 shadow-sm"
                  loading="lazy"
                />
              </div>
            )}

            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Pincode & Category Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Category Select */}
              <div className="w-full">
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "category", value } })
                  }
                  value={formData.category}
                >
                  <SelectTrigger id="category" className="w-full mt-1">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance & Banking">
                      Finance & Banking
                    </SelectItem>
                    <SelectItem value="Retail & E-commerce">
                      Retail & E-commerce
                    </SelectItem>
                    <SelectItem value="Hospitality & Tourism">
                      Hospitality & Tourism
                    </SelectItem>
                    <SelectItem value="Manufacturing & Industrial">
                      Manufacturing & Industrial
                    </SelectItem>
                    <SelectItem value="Energy & Utilities">
                      Energy & Utilities
                    </SelectItem>
                    <SelectItem value="Transportation & Logistics">
                      Transportation & Logistics
                    </SelectItem>
                    <SelectItem value="Media & Entertainment">
                      Media & Entertainment
                    </SelectItem>
                    <SelectItem value="Agriculture & Food">
                      Agriculture & Food
                    </SelectItem>
                    <SelectItem value="Jewellery">Jewellery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pincode Input */}
              <Input
                type="text"
                name="address.pincode"
                placeholder="Pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                required
                className="w-full mt-1"
              />
            </div>

            {/* Email + Phone Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Email */}
              <div className="w-full">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1"
                />
              </div>

              {/* Phone */}
              <div className="w-full">
                <Input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full mt-1"
                />
              </div>
            </div>

            {/* --- Address Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* State Dropdown */}
              <div>
                <Select
                  value={selectedState || ""}
                  onValueChange={(selected) => {
                    fetchDistricts(selected);
                    setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        state: selected,
                        district: "",
                      },
                    }));
                  }}
                >
                  <SelectTrigger id="state" className="mt-1 w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {states.map((state) => (
                      <SelectItem key={state.code} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* District Dropdown */}
              <div>
                <Select
                  value={formData.address.district || ""}
                  onValueChange={(district) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, district: district },
                    }))
                  }
                  disabled={districts.length === 0}
                >
                  <SelectTrigger id="district" className="mt-1 w-full">
                    <SelectValue
                      placeholder={
                        districts.length === 0
                          ? "Select State First"
                          : "Select District"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {districts.map((district, idx) => (
                      <SelectItem key={idx} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Social Media Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Input
                type="text"
                name="socialMedia.facebook"
                placeholder="Facebook"
                value={formData.socialMedia.facebook}
                onChange={handleChange}
                className="w-full mt-1"
              />

              <Input
                type="text"
                name="socialMedia.instagram"
                placeholder="Instagram"
                value={formData.socialMedia.instagram}
                onChange={handleChange}
                className="w-full mt-1"
              />

              <Input
                type="text"
                name="socialMedia.twitter"
                placeholder="Twitter"
                value={formData.socialMedia.twitter}
                onChange={handleChange}
                className="w-full mt-1"
              />

              <Input
                type="text"
                name="socialMedia.linkedin"
                placeholder="LinkedIn"
                value={formData.socialMedia.linkedin}
                onChange={handleChange}
                className="w-full mt-1"
              />

              {/* Full-width for website (spans both columns) */}
              <div className="md:col-span-2">
                <Input
                  type="text"
                  name="socialMedia.website"
                  placeholder="Website"
                  value={formData.socialMedia.website}
                  onChange={handleChange}
                  className="w-full mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#012a7a] hover:bg-[#001846] text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductListingForm;
