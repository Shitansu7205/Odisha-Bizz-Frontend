import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

export default function SearchForm() {
  const [district, setDistrict] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debounced fetch function
  const fetchSuggestions = useCallback(
    debounce(async (q, district) => {
      if (!q || !district) return setSuggestions([]);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/auth/search-suggestions?q=${q}&district=${district}`
        );
        setSuggestions(res.data.suggestions);
      } catch (err) {
        console.error(err);
      }
    }, 300),
    []
  );

  // Trigger search when query or district changes
  useEffect(() => {
    fetchSuggestions(query, district);

    // Cancel debounce on unmount or query/district change
    return () => fetchSuggestions.cancel();
  }, [query, district, fetchSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!district || !query) return;
    window.location.href = `/results?district=${district}&category=${query}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={district} onChange={(e) => setDistrict(e.target.value)}>
        <option value="">Select District</option>
        <option value="Khordha">Khordha</option>
        <option value="cuttack">Cuttack</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((cat) => (
            <li key={cat} onClick={() => setQuery(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      )}

      <button type="submit">Search</button>
    </form>
  );
}
