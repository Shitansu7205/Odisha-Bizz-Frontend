import { useEffect, useState } from "react";
import { Search, Mail, Phone, Clock, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import axios from "axios";

export default function Leads() {
    const API = import.meta.env.VITE_BACKEND_API_URL;

    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await axios.get(`${API}/lead-form`, { withCredentials: true }); // ✅ same as creadeyaisl true
                const sortedLeads = res.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setLeads(sortedLeads);
            } catch (error) {
                console.error("❌ Error fetching leads:", error);
            }
        };

        fetchLeads();
    }, [API]);


    const filteredLeads = leads.filter((lead) =>
        `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.phone}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const purposeColors = {
        project: "bg-blue-100 text-blue-700 border-blue-200",
        support: "bg-green-100 text-green-700 border-green-200",
        partnership: "bg-purple-100 text-purple-700 border-purple-200",
        career: "bg-yellow-100 text-yellow-700 border-yellow-200",
        other: "bg-gray-100 text-gray-700 border-gray-200",
    };

    return (
        <div className="p-6 space-y-6">
            <Card className="shadow-sm border border-gray-200">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-xl font-semibold text-green-600 flex items-center gap-2">
                        <Clock size={20} /> Leads Overview
                    </CardTitle>

                    <div className="flex items-center gap-2">
                        <Search className="text-gray-400" size={18} />
                        <Input
                            placeholder="Search leads..."
                            className="w-64 border-gray-300 focus:border-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-linear-to-r from-green-600 to-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Phone</th>
                                    <th className="px-4 py-3 text-left">Purpose</th>
                                    <th className="px-4 py-3 text-left">Message</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredLeads.length > 0 ? (
                                    filteredLeads.map((lead, i) => (
                                        <motion.tr
                                            key={lead._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: i * 0.03 }}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {lead.firstName} {lead.lastName}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center gap-2">
                                                                <Mail size={14} className="text-blue-600" />
                                                                <span>{lead.email}</span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Email: {lead.email}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center gap-2">
                                                                <Phone size={14} className="text-green-600" />
                                                                <span>{lead.phone || "-"}</span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Phone: {lead.phone}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant="outline"
                                                    className={`capitalize border ${purposeColors[lead.purpose]}`}
                                                >
                                                    {lead.purpose}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center gap-2">
                                                                <MessageSquare size={14} className="text-gray-500" />
                                                                <span>{lead.message}</span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>{lead.message}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {new Date(lead.createdAt).toLocaleString()}
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            No leads found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
