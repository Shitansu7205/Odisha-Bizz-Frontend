import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    Pencil,
    Trash2,
    CheckCircle, AlertCircle, XCircle
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from '@/components/ui/badge'
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const ListingsSection = () => {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch listings
    const fetchData = async () => {
        try {
            const res = await axios.get(`${API}/get-listings`, { withCredentials: true });
            setListings(res.data.listings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {
                _id,
                title,
                description,
                category,
                email,
                phone,
                address,
                socialMedia,
                status,
                image, // new file if uploaded
            } = selectedListing;

            const formData = new FormData();

            // Append fields
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("status", status);
            formData.append("address", JSON.stringify(address));
            formData.append("socialMedia", JSON.stringify(socialMedia));

            // Only append if a new image is selected
            if (image) {
                formData.append("image", image);
            }

            const response = await axios.put(
                `${API}/update-listings/${_id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                toast.success("Listing updated successfully!");
                setOpen(false);
                fetchData(); // Refresh listings
            } else {
                toast.error(response.data?.message || "Failed to update listing");
            }
        } catch (error) {
            console.error("❌ Error updating listing:", error);

            if (error.response) {
                toast.error(error.response.data?.message || `Server Error (${error.response.status})`);
            } else if (error.request) {
                toast.error("No response from server. Check your connection.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };



    // ✅ Handle field changes
    const handleChange = (e) => {
        setSelectedListing({
            ...selectedListing,
            [e.target.name]: e.target.value,
        });
    };



    // Handel delete 
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${API}/delete-listings/${id}`, { withCredentials: true });
            if (res.status === 200) {
                toast.success("Listing deleted successfully!");
                fetchData(); // refresh
            }
        } catch (err) {
            console.error("Error deleting listing:", err);
            toast.error("Failed to delete listing. Try again.");
        }
    };




    return (
        <>
            {loading && <Loader />}


            <section className=" px-4 sm:px-8  min-h-screen">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#b6985a]">
                    🏨 Our Listings
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {listings.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">
                            No listings found.
                        </p>
                    ) : (
                        listings.map((listing, index) => (

                            <div className="relative max-w-md mx-auto rounded-2xl  shadow-lg transition-transform hover:scale-[1.02] " key={index}>
                                <div className="bg-white rounded-2xl overflow-hidden">
                                    {/* Image Section */}
                                    <div className="relative h-52 w-full">
                                        <img
                                            src={
                                                listing.imageUrl ||
                                                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60'
                                            }
                                            alt={listing.title}
                                            className="h-full w-full object-cover"
                                             loading="lazy"
                                        />



                                    </div>

                                    {/* Content */}
                                    <Card className="border-none shadow-none ">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                                                <span>{listing.title}</span>

                                                {/* Status Badge */}
                                                {listing.status?.toLowerCase() === "active" && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-blue-500 text-white dark:bg-blue-600"
                                                    >
                                                        <CheckCircle className="h-3.5 w-3.5 text-white" />
                                                        Active
                                                    </Badge>
                                                )}

                                                {listing.status?.toLowerCase() === "pending" && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-yellow-500 text-white dark:bg-yellow-600"
                                                    >       <AlertCircle className="h-3.5 w-3.5 text-white" />
                                                        Pending
                                                    </Badge>
                                                )}

                                                {listing.status?.toLowerCase() === "inactive" && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-red-500 text-white dark:bg-red-600"
                                                    >                                                         <XCircle className="h-3.5 w-3.5 text-white " />
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </CardTitle>


                                            <CardDescription className="flex flex-wrap items-center gap-2 text-gray-600">
                                                <Badge variant="outline">{listing.category}</Badge>
                                                <Badge variant="outline">{listing.address?.district}</Badge>
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-3 text-gray-700">
                                            <p className="line-clamp-2">
                                                {listing.description
                                                    ?.split(" ")
                                                    .slice(0, 20)
                                                    .join(" ") + (listing.description?.split(" ").length > 20 ? "..." : "")}
                                            </p>
                                        </CardContent>


                                        <CardFooter className="flex justify-between items-center border-t  px-4 ">
                                            {/* Social Icons */}
                                            <div className="flex items-center gap-2 ">
                                                {listing.socialMedia?.facebook && (
                                                    <a
                                                        href={listing.socialMedia.facebook}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                                                    >
                                                        <FaFacebookF size={16} />
                                                    </a>
                                                )}
                                                {listing.socialMedia?.instagram && (
                                                    <a
                                                        href={listing.socialMedia.instagram}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white transition-all"
                                                    >
                                                        <FaInstagram size={16} />
                                                    </a>
                                                )}
                                                {listing.socialMedia?.twitter && (
                                                    <a
                                                        href={listing.socialMedia.twitter}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
                                                    >
                                                        <FaXTwitter size={16} />
                                                    </a>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 ">
                                                <Button
                                                    onClick={() => {
                                                        setSelectedListing(listing)
                                                        setOpen(true)
                                                    }}
                                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                                                >
                                                    <Pencil size={16} />
                                                    Update
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full">
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent className="bg-white rounded-2xl shadow-lg">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle className="text-blue-600 text-lg">
                                                                Confirm Deletion
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription className="text-gray-600">
                                                                Are you sure you want to delete this listing? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter className="flex justify-end gap-3">
                                                            <AlertDialogCancel className="border border-gray-300 text-gray-700 rounded-md">
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(listing._id)}
                                                                className="bg-green-600 hover:bg-green-700 text-white rounded-md"
                                                            >
                                                                Yes, Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ✅ Update Sheet */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="right" className="w-full max-w-md bg-white">
                        <SheetHeader>
                            <SheetTitle className="text-[#b6985a]">Edit Listing</SheetTitle>
                            <SheetDescription>
                                Update the listing details below and click save when finished.
                            </SheetDescription>
                        </SheetHeader>

                        {selectedListing && (
                            <form
                                onSubmit={handleUpdate}
                                className="space-y-5 p-4 mt-4 overflow-y-auto"
                            >
                                {/* Title */}
                                <div className="flex flex-col">
                                    <Label htmlFor="title" className="mb-1">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={selectedListing.title}
                                        onChange={handleChange}
                                        placeholder="Enter title"
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col">
                                    <Label htmlFor="description" className="mb-1">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={selectedListing.description}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Enter description"
                                    />
                                </div>

                                {/* Category */}
                                {/* <div className="flex flex-col">
                                    <Label htmlFor="category" className="mb-1">Category</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        value={selectedListing.category}
                                        onChange={handleChange}
                                        placeholder="Enter category (e.g., Restaurant, Travel)"
                                    />
                                </div> */}
                                <div className="flex flex-col">
                                    <Label htmlFor="v" className="mb-1">Category</Label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={selectedListing.category}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 text-sm focus:ring-[#b6985a] focus:border-[#b6985a]"
                                    >
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Finance & Banking">Finance & Banking</option>
                                        <option value="Retail & E-commerce">Retail & E-commerce</option>
                                        <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                                        <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                                        <option value="Energy & Utilities">Energy & Utilities</option>
                                        <option value="Transportation & Logistics">Transportation & Logistics</option>
                                        <option value="Media & Entertainment">Media & Entertainment</option>
                                        <option value="Agriculture & Food">Agriculture & Food</option>
                                        <option value="Jewellery">Jewellery</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="flex flex-col">
                                    <Label htmlFor="status" className="mb-1">Status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={selectedListing.status}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 text-sm focus:ring-[#b6985a] focus:border-[#b6985a]"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col">
                                    <Label htmlFor="phone" className="mb-1">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={selectedListing.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col">
                                    <Label htmlFor="email" className="mb-1">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={selectedListing.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                    />
                                </div>

                                {/* Address Section */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="flex flex-col">
                                        <Label htmlFor="district" className="mb-1">district</Label>
                                        <Input
                                            id="district"
                                            name="district"
                                            value={selectedListing.address?.district || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    address: { ...selectedListing.address, district: e.target.value },
                                                })
                                            }
                                            placeholder="district"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <Label htmlFor="state" className="mb-1">State</Label>
                                        <Input
                                            id="state"
                                            name="state"
                                            value={selectedListing.address?.state || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    address: { ...selectedListing.address, state: e.target.value },
                                                })
                                            }
                                            placeholder="State"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <Label htmlFor="pincode" className="mb-1">Pincode</Label>
                                        <Input
                                            id="pincode"
                                            name="pincode"
                                            value={selectedListing.address?.pincode || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    address: { ...selectedListing.address, pincode: e.target.value },
                                                })
                                            }
                                            placeholder="Pincode"
                                        />
                                    </div>
                                </div>

                                {/* Social Media Links */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex flex-col">
                                        <Label htmlFor="facebook" className="mb-1">Facebook</Label>
                                        <Input
                                            id="facebook"
                                            name="facebook"
                                            value={selectedListing.socialMedia?.facebook || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    socialMedia: { ...selectedListing.socialMedia, facebook: e.target.value },
                                                })
                                            }
                                            placeholder="Facebook URL"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <Label htmlFor="instagram" className="mb-1">Instagram</Label>
                                        <Input
                                            id="instagram"
                                            name="instagram"
                                            value={selectedListing.socialMedia?.instagram || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    socialMedia: { ...selectedListing.socialMedia, instagram: e.target.value },
                                                })
                                            }
                                            placeholder="Instagram URL"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <Label htmlFor="twitter" className="mb-1">Twitter</Label>
                                        <Input
                                            id="twitter"
                                            name="twitter"
                                            value={selectedListing.socialMedia?.twitter || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    socialMedia: { ...selectedListing.socialMedia, twitter: e.target.value },
                                                })
                                            }
                                            placeholder="Twitter URL"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <Label htmlFor="linkedin" className="mb-1">LinkedIn</Label>
                                        <Input
                                            id="linkedin"
                                            name="linkedin"
                                            value={selectedListing.socialMedia?.linkedin || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    socialMedia: { ...selectedListing.socialMedia, linkedin: e.target.value },
                                                })
                                            }
                                            placeholder="LinkedIn URL"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label htmlFor="website" className="mb-1">Website</Label>
                                        <Input
                                            id="website"
                                            name="website"
                                            value={selectedListing.socialMedia?.website || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    socialMedia: { ...selectedListing.socialMedia, website: e.target.value },
                                                })
                                            }
                                            placeholder="Website URL"
                                        />
                                    </div>
                                    {/* Image Upload */}
                                    <div className="flex flex-col">
                                        <Label htmlFor="image" className="mb-1">Upload Image</Label>

                                        {/* Preview existing or newly selected image */}
                                        {selectedListing.imageUrl && (
                                            <img
                                                src={selectedListing.imageUrl}
                                                alt="Current"
                                                className="w-32 h-32 rounded-md object-cover mb-2 border"
                                                 loading="lazy"
                                            />
                                        )}

                                        {/* File input for new image */}
                                        <Input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setSelectedListing({
                                                        ...selectedListing,
                                                        image: file,
                                                        imageUrl: URL.createObjectURL(file), // temporary preview
                                                    });
                                                }
                                            }}
                                        />
                                    </div>


                                </div>

                                <SheetFooter className="flex justify-end gap-3 mt-4">
                                    <SheetClose asChild>
                                        <Button variant="outline" className="mb-1">Cancel</Button>
                                    </SheetClose>
                                    <Button
                                        type="submit"
                                        className="bg-[#b6985a] hover:bg-[#a3874e] text-white"
                                    >
                                        Save Changes
                                    </Button>
                                </SheetFooter>
                            </form>

                        )}
                    </SheetContent>
                </Sheet>
            </section>
        </>
    );
};

export default ListingsSection;
