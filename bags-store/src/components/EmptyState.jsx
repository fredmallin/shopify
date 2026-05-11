import { useNavigate } from "react-router-dom";

const EmptyState = ({ icon = "🛍️", title = "Nothing here yet", subtitle = "", action }) => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{icon}</div>
      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>{title}</h3>
      {subtitle && <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{subtitle}</p>}
      {action && (
        <button className="btn btn-primary" onClick={() => navigate(action.href)}>
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;