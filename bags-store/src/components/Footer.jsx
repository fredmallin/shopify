import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ textAlign: "center", padding: "20px", background: "#111", color: "#fff" }}>
      <p onClick={() => navigate("/admin-login")} style={{ cursor: "pointer" }}>
        @2026
      </p>
    </footer>
  );
}

export default Footer;