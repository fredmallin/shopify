import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiPackage, FiPlusCircle, FiSettings, FiLogOut, FiLock } from "react-icons/fi";
import { logoutAdmin } from "../../services/authService";
import toast from "react-hot-toast";
import "../../styles/admin.css";

const links = [
  { to: "/admin/dashboard", icon: <FiGrid />, label: "Dashboard" },
  { to: "/admin/products", icon: <FiPackage />, label: "Products" },
  { to: "/admin/add-product", icon: <FiPlusCircle />, label: "Add Product" },
  { to: "/admin/settings", icon: <FiSettings />, label: "Settings" },
  { to: "/admin/change-password", icon: <FiLock />, label: "Password" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        👜 <span>LuxBag</span> Admin
      </div>
      <nav className="sidebar__nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => `sidebar__item${isActive ? " active" : ""}`}>
            {l.icon} <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__footer">
        <button className="sidebar__logout-btn" onClick={handleLogout}>
          <FiLogOut /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;