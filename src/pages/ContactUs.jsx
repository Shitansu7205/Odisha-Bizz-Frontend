import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Briefcase, HelpCircle, Users, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ContactUs = () => {
    const API = import.meta.env.VITE_BACKEND_API_URL;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        purpose: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.firstName || !form.email || !form.message || !form.purpose) {
            toast.warn("Please fill all required fields");
            return;
        }

        try {
            const res = await fetch(`${API}/lead-form`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                toast.success("Message sent successfully!");
                setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    purpose: "",
                    message: "",
                });
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[240px] sm:h-[300px] lg:h-[360px] flex items-center justify-center overflow-hidden">
                <img
                    src="https://ctsdemo.com/odishabiz-website/assets/images/Finance_Banking.jpg"
                    alt="Background"
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
                        Contact Us
                    </h1>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section className="w-full py-20 bg-background md:px-20">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <div className="text-center mb-12 space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
                        <p className="text-muted-foreground">
                            We’d love to hear how we can collaborate or help you.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
                        {/* Form */}
                        <div className="w-full md:w-1/2 bg-card rounded-xl shadow-md p-8 border border-border/40">
                            <h3 className="text-lg font-semibold mb-6">Send us a message</h3>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Input
                                        name="firstName"
                                        placeholder="First Name *"
                                        value={form.firstName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={form.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Purpose Select */}
                                <Select
                                    value={form.purpose}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({ ...prev, purpose: value }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Purpose *" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="project">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-blue-500" />
                                                Project Inquiry
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="support">
                                            <div className="flex items-center gap-2">
                                                <Wrench className="w-4 h-4 text-green-500" />
                                                Customer Support
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="partnership">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-yellow-500" />
                                                Partnership
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="career">
                                            <div className="flex items-center gap-2">
                                                <HelpCircle className="w-4 h-4 text-pink-500" />
                                                Career
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="other">
                                            <div className="flex items-center gap-2">
                                                <HelpCircle className="w-4 h-4 text-gray-500" />
                                                Other
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email *"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                                <Textarea
                                    name="message"
                                    placeholder="Your Message *"
                                    rows={4}
                                    value={form.message}
                                    onChange={handleChange}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-medium"
                                >
                                    Send Inquiry
                                </Button>

                                <p className="text-sm text-center text-muted-foreground">
                                    We’ll respond within 1–2 business days.
                                </p>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8">
                            <div className="flex items-start gap-4 border-b pb-6">
                                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Our Address</h4>
                                    <p className="text-muted-foreground text-sm">
                                        We’re here to help with your business needs.
                                    </p>
                                    <p className="text-sm mt-1">
                                        300 Bath Street, Tay House<br />
                                        Glasgow G2 4JR, United Kingdom
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 border-b pb-6">
                                <Mail className="w-5 h-5 text-green-600 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Email Us</h4>
                                    <p className="text-muted-foreground text-sm">
                                        We’ll get back to you as soon as possible.
                                    </p>
                                    <p className="text-sm mt-1 font-medium">
                                        hello@example.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-5 h-5 text-green-600 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Call Us</h4>
                                    <p className="text-muted-foreground text-sm">
                                        Mon–Fri from 8am to 5pm.
                                    </p>
                                    <p className="text-sm mt-1 font-medium">
                                        +1 (555) 000-0000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;
