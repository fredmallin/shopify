import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>🛍️</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>404</h1>
      <h2 style={{ fontSize: "1.3rem", marginBottom: "0.75rem" }}>Page Not Found</h2>
      <p style={{ color: "var(--text-muted)", maxWidth: "400px", marginBottom: "2rem" }}>
        Looks like this page wandered off. Let's get you back to shopping!
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Go Home</button>
        <button className="btn btn-outline" onClick={() => navigate("/categories")}>Browse Categories</button>
      </div>
    </div>
  );
};

export default NotFound;