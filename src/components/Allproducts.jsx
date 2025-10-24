"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const ListingsSection = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/auth/get-listings");
                setListings(res.data.listings || []);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            }
        };
        fetchListings();
    }, []);

    return (
        <div className="flex justify-center p-8 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] w-full">
                {listings.map((listing) => (
                    <Card
                        key={listing._id}
                        className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg flex flex-col"
                    >
                        <CardHeader className="p-0">
                            <img
                                src="https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg" // static placeholder
                                alt={listing.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </CardHeader>

                        <CardContent className="flex-1 p-4">
                            <h2 className="text-xl font-bold mb-1">{listing.title}</h2>
                            <p className="text-sm text-muted-foreground mb-3">{listing.category}</p>
                            <p className="text-sm mb-4">{listing.description}</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <a href={listing.location.mapLink} target="_blank" rel="noopener noreferrer">
                                    <MapPin className="w-5 h-5 text-blue-500" />
                                </a>
                                <a href={listing.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                                    <Facebook className="w-5 h-5 text-blue-600" />
                                </a>
                                <a href={listing.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                    <Instagram className="w-5 h-5 text-pink-500" />
                                </a>
                                <a href={listing.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                    <Twitter className="w-5 h-5 text-blue-400" />
                                </a>
                            </div>
                        </CardContent>

                        <CardFooter className="p-4">
                            <Button variant="default" className="w-full">
                                View More
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );

};

export default ListingsSection;
