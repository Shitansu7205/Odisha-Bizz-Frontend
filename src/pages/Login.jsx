import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.warn("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                "https://odisha-bizz-backend.onrender.com/api/auth/login",
                form,
                { withCredentials: true } // ✅ important to store JWT cookie
            );

            if (response.status === 200) {
                toast.success("Login successful!");
                navigate("/dashboard"); // Redirect to protected route
            }

        } catch (error) {
            if (error.response?.status === 401) {
                toast.error("Invalid email or password");
            } else if (error.response?.status === 400) {
                toast.error("All fields are required");
            } else {
                toast.error("Login failed. Please try again.");
            }
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative min-h-screen">
            {loading && <Loader />}
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md p-3 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
                    <p className="text-center text-gray-500 text-sm mb-4">
                        Enter your credentials to access your account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                className="focus:ring-indigo-500 focus:border-indigo-500"
                            />
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
                                className="pr-10 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <span
                                className="absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </span>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full py-3">
                            Login
                        </Button>
                    </form>

                    {/* Links */}
                    <p className="text-center text-xs mt-4 text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
