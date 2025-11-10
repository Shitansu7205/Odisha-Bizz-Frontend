import React, { useEffect, useState } from "react";

const LocationDisplay = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [district, setDistrict] = useState("");
  const [error, setError] = useState("");

  // Function to get district from latitude & longitude
  const getDistrictFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      // const districtName =
      //   data.address.county || data.address.city || data.address.state || "Unknown";
      const districtName = data.address.state_district || "Unknown";
      setDistrict(districtName);
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setDistrict("Unknown");
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        getDistrictFromCoords(26.9124, 75.7873);
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location. Permission denied?");
      }
    );
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Your Location Info</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : coords.lat && coords.lon ? (
        <div className="space-y-2">
          <p>
            <strong>Latitude:</strong> {coords.lat.toFixed(6)}
          </p>
          <p>
            <strong>Longitude:</strong> {coords.lon.toFixed(6)}
          </p>
          <p>
            <strong>District:</strong> {district}
          </p>
        </div>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default LocationDisplay;
