import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ onSearch, placeholder = "Search bags, dresses, shoes…", inline = false }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query.trim());
    } else {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clear = () => { setQuery(""); if (onSearch) onSearch(""); };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", alignItems: "center", gap: "0.5rem",
      background: "#fff", borderRadius: "999px", padding: "0.5rem 0.75rem 0.5rem 1.25rem",
      border: "1.5px solid var(--border)", boxShadow: inline ? "none" : "var(--shadow)",
      width: inline ? "100%" : "min(560px, 100%)",
    }}>
      <FiSearch color="var(--text-muted)" size={18} style={{ flexShrink: 0 }} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, fontSize: "0.9rem", color: "var(--text)", background: "transparent" }}
      />
      {query && (
        <button type="button" onClick={clear} style={{ background: "none", color: "var(--text-muted)" }}>
          <FiX size={16} />
        </button>
      )}
      <button type="submit" className="btn btn-primary" style={{ borderRadius: "999px", padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;