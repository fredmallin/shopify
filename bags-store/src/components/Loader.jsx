const Loader = ({ size = 48, text = "Loading…" }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", gap: "1rem" }}>
    <div style={{
      width: size, height: size, border: "3px solid var(--border)",
      borderTop: "3px solid var(--primary)", borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    {text && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{text}</p>}
  </div>
);

export default Loader;