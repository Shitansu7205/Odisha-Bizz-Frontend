import React, { useEffect, useState } from "react";
import axios from "axios";
import Unauthorized from "../components/Unauthorized";
import LogoutButton from "@/components/LogoutButton";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://odisha-bizz-backend.onrender.com/api/auth/dashboard", {
                    withCredentials: true, // send JWT cookie
                });
                setUsers(res.data.users);
            } catch (err) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setUnauthorized(true); // mark as unauthorized
                } else {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
      if (unauthorized) return <Unauthorized />; // show unauthorized component
    // if (unauthorized) return <div>Unauthorized</div>; // show unauthorized component

    return (
        <>
            <h1>Dashboard</h1>
            <h3>All Users</h3>
            <LogoutButton/>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} — {user.email}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Dashboard;
