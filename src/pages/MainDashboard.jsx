import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Allproducts from "../components/Allproducts";
import Leads from "@/components/Leads";
import ProfilePage from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "@/components/AdminNav";
import HomeDashboard from "../components/DashBoradHome";
import AllListings from "@/components/DasBoardAllListing"

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
                return <AllListings />;
            case "Leads":
                return <Leads />;
            case "Users":
                return <Allproducts />;
            case "Profile":
                return <ProfilePage />;
            case "Settings":
                return;
            default:
                return <HomeDashboard />;
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
                <AdminHeader />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
            </div>
        </div>
    );
}
