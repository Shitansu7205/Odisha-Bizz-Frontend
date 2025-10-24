import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Eye, EyeOff, UserPlus } from "lucide-react";



export default function Signup() {
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
            const response = await axios.post('https://odisha-bizz-backend.onrender.com/api/auth/signup', form)

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
            <div className="relative min-h-screen">
                {loading && <Loader />} {/* This will overlay the entire page */}

                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="w-full max-w-md p-3 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-2 text-center">Create an Account</h2>
                        <p className="text-center text-gray-500  text-sm">
                            Enter your details below to create your account
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 max-w-md w-full mx-auto space-y-6"
                        >
                            {/* Name */}
                            <div className="flex flex-col">
                                <Label htmlFor="name" className="mb-1 font-medium">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                    className="focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <Label htmlFor="email" className="mb-1 font-medium">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className={`focus:ring-indigo-500 focus:border-indigo-500 ${form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "border-red-500" : ""
                                        }`}
                                />
                                {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                                    <p className="text-red-500 text-sm mt-1">Invalid email</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col relative">
                                <Label htmlFor="password" className="mb-1 font-medium">Password</Label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                    onFocus={() => setPasswordTouched(true)}
                                    className="pr-10 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {/* Eye Icon */}
                                <span
                                    className="absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer text-gray-500"
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

                            {/* Confirm Password */}
                            <div className="flex flex-col">
                                <Label htmlFor="confirmPassword" className="mb-1 font-medium">Confirm Password</Label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    required
                                    className="focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {form.confirmPassword && form.confirmPassword !== form.password && (
                                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full py-3">
                                <UserPlus className="w-5 h-5" />
                                Create Account
                            </Button>
                        </form>
                        {/* Terms and Login */}
                        <p className="text-center text-xs text-gray-500 mt-4">
                            By clicking continue, you agree to our{" "}
                            <a href="/terms" className="underline hover:text-indigo-600">Terms of Service</a> and{" "}
                            <a href="/privacy" className="underline hover:text-indigo-600">Privacy Policy</a>.
                        </p>

                        <p className="text-center text-xs mt-3 text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
