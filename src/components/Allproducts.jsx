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

    // ✅ Handle Update Submit
    // const handleUpdate = async (e) => {
    //     setLoading(true);
    //     e.preventDefault();
    //     try {
    //         await axios.put(`${API}/update-listings/${selectedListing._id}`, selectedListing);
    //         setOpen(false);
    //         fetchData();
    //         setLoading(false);
    //         toast.success("Listing updated successfully!");
    //     } catch (error) {
    //         console.error("Error updating listing:", error);
    //         toast.error("Failed to update listing. Please try again.");
    //         setLoading(false);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 🧩 Extract only the fields that can be updated
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
            } = selectedListing;

            const payload = {
                title,
                description,
                category,
                email,
                phone,
                address,
                socialMedia,
                status,
            };

            const response = await axios.put(`${API}/update-listings/${_id}`, payload, { withCredentials: true });

            if (response.status === 200) {
                toast.success("Listing updated successfully!");
                setOpen(false);
                fetchData(); // Refresh the list
            } else {
                toast.error(response.data?.message || "Failed to update listing");
            }
        } catch (error) {
            console.error("❌ Error updating listing:", error);

            if (error.response) {
                // Server responded but with a non-2xx code
                const { status, data } = error.response;
                toast.error(data?.message || `Server Error (${status})`);
            } else if (error.request) {
                // No response from server
                toast.error("No response from server. Check your connection.");
            } else {
                // Other errors
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


            <section className="py-10 px-4 sm:px-8 bg-[#faf8f3] min-h-screen">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#b6985a]">
                    🏨 Our Listings
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-26">
                    {listings.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">
                            No listings found.
                        </p>
                    ) : (
                        listings.map((listing, index) => (
                            //                         <Card
                            //                             key={listing._id}
                            //                             className="hover:shadow-xl transition-all border border-gray-200 rounded-2xl overflow-hidden bg-white"
                            //                         >
                            //                             {/* ✅ Image Header */}
                            //                             <div className="relative">
                            //                                 <img
                            //                                     src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
                            //                                     alt="Listing"
                            //                                     className="w-full h-44 object-cover"
                            //                                 />
                            //                                 <div
                            //                                     className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                            // ${listing.status?.toLowerCase() === "active"
                            //                                             ? "bg-green-100 text-green-700 border border-green-400"
                            //                                             : listing.status?.toLowerCase() === "pending"
                            //                                                 ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
                            //                                                 : listing.status?.toLowerCase() === "inactive"
                            //                                                     ? "bg-red-100 text-red-700 border border-red-400"
                            //                                                     : "bg-gray-100 text-gray-700 border border-gray-400"
                            //                                         }`}
                            //                                 >
                            //                                     {listing.status}
                            //                                 </div>

                            //                             </div>

                            //                             {/* ✅ Content */}
                            //                             <CardHeader className="space-y-1 pb-2">
                            //                                 <div className="flex items-center justify-between">
                            //                                     <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            //                                         <Building2 size={18} className="text-blue-600" />
                            //                                         {listing.title}
                            //                                     </h3>
                            //                                 </div>
                            //                                 <p className="text-sm text-gray-500">{listing.category}</p>
                            //                             </CardHeader>

                            //                             <CardContent className="text-sm text-gray-700 space-y-2">
                            //                                 <p className="line-clamp-2">{listing.description}</p>

                            //                                 <div className="flex items-center gap-2 text-gray-600">
                            //                                     <MapPin size={16} className="text-blue-600" />
                            //                                     <span>
                            //                                         {listing.address.city}, {listing.address.state} -{" "}
                            //                                         {listing.address.pincode}
                            //                                     </span>
                            //                                 </div>

                            //                                 <div className="flex items-center gap-2">
                            //                                     <Phone size={16} className="text-green-600" />
                            //                                     <span>{listing.phone}</span>
                            //                                 </div>

                            //                                 <div className="flex items-center gap-2">
                            //                                     <Mail size={16} className="text-blue-600" />
                            //                                     <span>{listing.email}</span>
                            //                                 </div>
                            //                             </CardContent>

                            //                             {/* ✅ Footer with Socials */}
                            //                             <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100">
                            //                                 <div className="flex gap-3 text-gray-500">
                            //                                     <a
                            //                                         href={listing.socialMedia?.facebook}
                            //                                         target="_blank"
                            //                                         rel="noreferrer"
                            //                                         className="hover:text-blue-600"
                            //                                     >
                            //                                         <Facebook size={18} />
                            //                                     </a>
                            //                                     <a
                            //                                         href={listing.socialMedia?.instagram}
                            //                                         target="_blank"
                            //                                         rel="noreferrer"
                            //                                         className="hover:text-pink-600"
                            //                                     >
                            //                                         <Instagram size={18} />
                            //                                     </a>
                            //                                     <a
                            //                                         href={listing.socialMedia?.twitter}
                            //                                         target="_blank"
                            //                                         rel="noreferrer"
                            //                                         className="hover:text-sky-500"
                            //                                     >
                            //                                         <Twitter size={18} />
                            //                                     </a>
                            //                                     <a
                            //                                         href={listing.socialMedia?.website}
                            //                                         target="_blank"
                            //                                         rel="noreferrer"
                            //                                         className="hover:text-green-600"
                            //                                     >
                            //                                         <Globe size={18} />
                            //                                     </a>
                            //                                 </div>

                            //                                 {/* ✅ Buttons */}
                            //                                 <div className="flex gap-2">
                            //                                     <Button
                            //                                         onClick={() => {
                            //                                             setSelectedListing(listing);
                            //                                             setOpen(true);
                            //                                         }}
                            //                                         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4"
                            //                                     >
                            //                                         <Pencil size={16} />
                            //                                         Update
                            //                                     </Button>

                            //                                     <AlertDialog>
                            //                                         <AlertDialogTrigger asChild>
                            //                                             <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4">
                            //                                                 <Trash2 size={16} />
                            //                                                 Delete
                            //                                             </Button>
                            //                                         </AlertDialogTrigger>

                            //                                         <AlertDialogContent className="bg-white rounded-2xl shadow-lg">
                            //                                             <AlertDialogHeader>
                            //                                                 <AlertDialogTitle className="text-green-700 text-lg">
                            //                                                     Confirm Deletion
                            //                                                 </AlertDialogTitle>
                            //                                                 <AlertDialogDescription className="text-gray-600">
                            //                                                     Are you sure you want to delete this listing? This action
                            //                                                     cannot be undone.
                            //                                                 </AlertDialogDescription>
                            //                                             </AlertDialogHeader>

                            //                                             <AlertDialogFooter className="flex justify-end gap-3">
                            //                                                 <AlertDialogCancel className="border border-gray-300 text-gray-700 rounded-md">
                            //                                                     Cancel
                            //                                                 </AlertDialogCancel>
                            //                                                 <AlertDialogAction
                            //                                                     onClick={() => handleDelete(listing._id)}
                            //                                                     className="bg-green-600 hover:bg-green-700 text-white rounded-md"
                            //                                                 >
                            //                                                     Yes, Delete
                            //                                                 </AlertDialogAction>
                            //                                             </AlertDialogFooter>
                            //                                         </AlertDialogContent>
                            //                                     </AlertDialog>
                            //                                 </div>
                            //                             </CardFooter>
                            //                         </Card>
                            <div className="relative max-w-md mx-auto rounded-2xl  shadow-lg transition-transform hover:scale-[1.02] " key={index}>
                                <div className="bg-white rounded-2xl overflow-hidden">
                                    {/* Image Section */}
                                    <div className="relative h-52 w-full">
                                        <img
                                            src={
                                                listing.image ||
                                                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60'
                                            }
                                            alt={listing.title}
                                            className="h-full w-full object-cover"
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
                                                <Badge variant="outline">{listing.address?.city}</Badge>
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
                                        <Label htmlFor="city" className="mb-1">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={selectedListing.address?.city || ""}
                                            onChange={(e) =>
                                                setSelectedListing({
                                                    ...selectedListing,
                                                    address: { ...selectedListing.address, city: e.target.value },
                                                })
                                            }
                                            placeholder="City"
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
