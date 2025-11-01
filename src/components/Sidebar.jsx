import { LayoutDashboard, List, Users, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const links = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, badge: null },
    { name: "All Listings", icon: <List size={18} />, badge: null },
    { name: "Leads", icon: <List size={18} />, badge: 8 },
    { name: "Users", icon: <Users size={18} />, badge: 4 },
    { name: "Profile", icon: <User size={18} />, badge: null },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r shadow-sm flex flex-col sticky top-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6 text-center py-4 bg-linear-to-r from-green-600 to-blue-600 text-white rounded-lg mx-3 mt-4 shadow-md"
      >
        BizPanel
      </motion.div>

      <Separator className="mb-4" />

      {/* Sidebar Links */}
      <ul className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const isActive = activeTab === link.name;
          return (
            <li key={link.name}>
              <button
                onClick={() => setActiveTab(link.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-linear-to-r from-green-600 to-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition group-hover:scale-110 ${isActive ? "text-white" : "text-gray-500"
                      }`}
                  >
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </div>

                {link.badge && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${isActive
                        ? "bg-white text-blue-600"
                        : "bg-blue-50 text-blue-600 border-blue-200"
                      }`}
                  >
                    {link.badge}
                  </Badge>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-auto px-4 py-3 border-t text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Safe Way
      </div>
    </aside>
  );
};

export default Sidebar;
