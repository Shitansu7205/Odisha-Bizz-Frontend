import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Users,
    Rocket,
    Star,
    Briefcase,
    ArrowRight,
    Info,
    CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const About = () => {
    const router = useNavigate();
    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[240px] sm:h-[300px] lg:h-[360px] flex items-center justify-center overflow-hidden">
                <img
                    src="https://ctsdemo.com/odishabiz-website/assets/images/Finance_Banking.jpg"
                    alt="Background Image"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 text-center text-white px-4"
                >
                    <p className="text-sm sm:text-base text-gray-300 mb-2 tracking-wide">
                        Empowering businesses with technology & innovation
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg">
                        About Us
                    </h1>
                </motion.div>
            </section>



            <section className="w-full py-20 bg-background md:px-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    {/* Left: Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src="/images/about-1st.jpg"
                            alt="Odisha Bizz team working"
                            className="rounded-xl shadow-lg w-full object-cover"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <Badge
                            variant="secondary"
                            className="uppercase tracking-wider font-medium text-sm bg-gray-200"
                        >
                            About Odisha Bizz
                        </Badge>

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Solutions for Client-Facing Businesses
                        </h2>

                        <p className="text-muted-foreground leading-relaxed">
                            Odisha Bizz is dedicated to helping companies unlock growth through
                            innovative digital solutions. We design and build intelligent tools
                            that streamline operations, empower teams, and strengthen customer
                            relationships. From startups to enterprises, our focus is on
                            delivering excellence that spans every industry.
                        </p>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">
                                What Drives Our Excellence
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    "Custom business software",
                                    "Agile project management",
                                    "End-to-end digital strategy",
                                    "Full-stack engineering expertise",
                                    "Secure & scalable solutions",
                                    "24/7 client support",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4">
                            <Button
                                onClick={() => router("/")}
                                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 shadow-md rounded-xl"
                            >
                                <Info className="w-4 h-4" />
                                Learn More
                            </Button>
                            <Button
                                onClick={() => router("/contact")}
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md rounded-xl"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
