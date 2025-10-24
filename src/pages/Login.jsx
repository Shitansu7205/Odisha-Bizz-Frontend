import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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
                <div className="w-full max-w-md p-3 bg-white rounded-lg shadow-lg  sm:p-10">
                    <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
                    <p className="text-center text-gray-500 text-sm mb-4">
                        Enter your credentials to access your account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="flex flex-col relative">
                            <Label htmlFor="email" className="mb-2 font-medium text-gray-700">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="pl-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col relative">
                            <Label htmlFor="password" className="mb-2 font-medium text-gray-700">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="pl-10 pr-10 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </span>
                            </div>
                        </div>
                        {/* Remember me + forgot password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={form.remember}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 focus:ring-indigo-500"
                                />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        {/* Submit */}
                        <Button type="submit" className="w-full py-3">
                            Login
                        </Button>
                    </form>
                    {/* OR separator */}
                    <div className="flex items-center my-5">
                        <hr className="grow border-gray-300" />
                        <span className="px-3 text-gray-400">OR</span>
                        <hr className="grow border-gray-300" />
                    </div>
                    {/* Links */}
                    <p className="text-center text-xs mt-4 text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/admin/signup" className="text-indigo-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
