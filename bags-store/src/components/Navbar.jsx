import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        Auto<span style={{ color: "#ff3c00" }}>Xpress</span>
      </div>

      <div style={styles.links}>
        <Link
          to="/"
          style={{
            ...styles.link,
            color: isActive("/") ? "#ff3c00" : "#fff",
          }}
        >
          Home
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    background: "#111",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxSizing: "border-box",
  },

  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "500",
    transition: "0.3s",
  },
};

export default Navbar;