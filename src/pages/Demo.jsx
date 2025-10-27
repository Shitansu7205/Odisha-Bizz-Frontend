import React, { useEffect, useState } from "react";
import axios from "axios";

const Demo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/test`);
        console.log("Response Data:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Backend Response:</h2>
      <pre className="bg-gray-100 p-3 rounded-md">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Demo;
