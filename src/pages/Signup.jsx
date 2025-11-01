import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Eye, EyeOff, UserPlus, Mail, Lock, User } from "lucide-react";
import { Checkbox } from '@/components/ui/checkbox'
import { motion } from "framer-motion";



export default function Signup() {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [unmetRules, setUnmetRules] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);


    // Define the rules outside your component (or inside useEffect)
    const passwordRules = [
        { id: 1, label: "At least 1 uppercase letter", regex: /[A-Z]/ },
        { id: 2, label: "At least 1 lowercase letter", regex: /[a-z]/ },
        { id: 3, label: "At least 1 special character", regex: /[@$!%*?&]/ },
        { id: 4, label: "At least 1 number", regex: /\d/ },
        { id: 5, label: "At least 8 characters", regex: /^.{8,}$/ },
    ];




    // Real-time field validation
    useEffect(() => {
        const unmet = passwordRules.filter(rule => !rule.regex.test(form.password));
        setUnmetRules(unmet);

        // Form validity
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            form.name &&
            emailRegex.test(form.email) &&
            unmet.length === 0 &&
            form.password === form.confirmPassword
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [form.password, form.confirmPassword, form.email, form.name]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast.warn("All fields are required");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.warn("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API}/signup`, form)


            if (response.status === 201) {
                toast.success("Signup successful!");
                navigate("/admin/login");

            }

        } catch (error) {
            if (error.response?.status === 409) {
                toast.error("User already exists");
            } else {
                toast.error("Signup failed. Please try again.");
            }
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }


    };

    return (
        <>
            {loading && <Loader />} {/* This will overlay the entire page */}

            <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
                <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg bg-white md:flex-row flex-col">

                    {/* Left section */}
                    <div className="w-full md:w-1/2 p-10">
                        <div className="flex items-center gap-2 mb-8">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="w-full h-10 object-contain animate-fade-in"
                            />

                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            Create an Account
                        </h2>


                        <div className="relative flex items-center justify-start mb-6">
                            {/* <div className="absolute inset-x-0 h-px bg-gray-200"></div> */}
                            <span className="relative bg-white px-0 text-gray-400 text-sm">
                                Sign up to explore powerful features built just for you.
                            </span>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className={`pl-9  ${form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "border-red-500" : ""
                                            }`}
                                    />
                                    {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                                        <p className="text-red-500 text-sm mt-1">Invalid email</p>
                                    )}
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        required
                                        onFocus={() => setPasswordTouched(true)}
                                        className="pl-9"
                                    />
                                    {/* Eye Icon */}
                                    <span
                                        className="absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                        onClick={() => setShowPassword(prev => !prev)}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </span>
                                    {/* First unmet rule */}
                                    <div className="mt-2">
                                        {passwordTouched && (() => {
                                            const firstUnmet = passwordRules.find(rule => !rule.regex.test(form.password));
                                            return firstUnmet ? (
                                                <span className="text-sm text-red-500">{firstUnmet.label}</span>
                                            ) : null;
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        required
                                        className="pl-9"
                                    />
                                    {form.confirmPassword && form.confirmPassword !== form.password && (
                                        <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                                    )}
                                </div>
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-center gap-2 text-sm">
                                <Checkbox
                                    id="terms"
                                    name="terms"
                                    checked={form.terms}
                                    onCheckedChange={(checked) => setForm({ ...form, terms: checked })}
                                />
                                <Label htmlFor="terms" className="text-gray-600">
                                    I agree to the{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Terms & Conditions
                                    </a>
                                </Label>
                            </div>

                            {/* Button */}
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                Create Account
                            </Button>

                            <p className="text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link to="/admin/login" className="text-blue-600 hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </form>


                    </div>

                    {/* Right section */}
                    <div className="w-full md:w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10 space-y-6">
                        <div className="relative">

                            <motion.img
                                src="/images/signup.png"
                                alt="Logo"
                                className="w-full h-80 object-contain"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -10, 0], // float motion
                                }}
                                transition={{
                                    opacity: { duration: 0.8, ease: "easeOut" }, // fade-in timing
                                    y: {
                                        duration: 3, // duration of one float cycle
                                        ease: "easeInOut",
                                        repeat: Infinity, // loop forever
                                    },
                                }}
                            />

                            <div className="flex items-center justify-center space-x-6">
                                <img
                                    src="/images/facebook_icons.png"
                                    alt="Slack"
                                    className="w-10 h-10 bg-white rounded-full p-2"
                                />
                                <img
                                    src="/images/Google__G__logo.png"
                                    alt="Google"
                                    className="w-10 h-10 bg-white rounded-full p-2"
                                />
                                <img
                                    src="/images/github_icons.png"
                                    alt="Google"
                                    className="w-10 h-10 bg-white rounded-full p-2"
                                />
                            </div>

                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-semibold">
                                Connect with every application.
                            </h3>
                            <p className="text-white/80 text-sm">
                                Everything you need in an easily customizable dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
