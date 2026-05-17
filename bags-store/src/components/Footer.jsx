import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>
          {/* HIDDEN ADMIN
          <span
            onClick={() => navigate("/admin/login")}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "6px",
            }}
          >
            @
          </span>

          2026 South Tetu Girls High School. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;