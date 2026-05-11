import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsAppGeneral } from "../services/whatsappService";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          👜 <span>LuxBag</span>Store
        </div>

        <ul className="navbar__links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/categories">Categories</NavLink></li>
          <li><NavLink to="/search">Search</NavLink></li>
        </ul>

        <div className="navbar__actions">
          <button className="navbar__wa-btn" onClick={openWhatsAppGeneral}>
            <FaWhatsapp /> WhatsApp
          </button>
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <div className={`navbar__mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/categories" onClick={() => setMenuOpen(false)}>Categories</NavLink>
        <NavLink to="/search" onClick={() => setMenuOpen(false)}>Search</NavLink>
        <button className="navbar__wa-btn" style={{ width: "fit-content" }} onClick={() => { openWhatsAppGeneral(); setMenuOpen(false); }}>
          <FaWhatsapp /> Chat on WhatsApp
        </button>
      </div>
    </nav>
  );
};

export default Navbar;