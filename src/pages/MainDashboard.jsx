import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Allproducts from "../components/Allproducts";
import Leads from "@/components/Leads";
import ProfilePage from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Leads from "../pages/Leads";
// import Users from "../pages/Users";
// import Profile from "../pages/Profile";

export default function MainDashboard() {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                // navigate("/admin/login"); //  Redirect to login
            } finally {
                setLoading(false); // stop loader in all cases
            }
        };

        checkAuth();
    }, [navigate]);

    const renderContent = () => {
        switch (activeTab) {
            case "All Listings":
                return <Allproducts />;
            case "Leads":
                return <Leads />;
            case "Users":
                return <Allproducts />;
            case "Profile":
                return <ProfilePage />;
            default:
                return <Allproducts />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 fixed inset-y-0 left-0 z-30">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64 ">
                {/* Topbar */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-20">
                    <h1 className="text-xl font-semibold text-green-600">
                        {activeTab}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium">Hello, Admin 👋</span>
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=16a34a&color=fff"
                            alt="Profile"
                            className="w-9 h-9 rounded-full border"
                        />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
            </div>
        </div>
    );
}
