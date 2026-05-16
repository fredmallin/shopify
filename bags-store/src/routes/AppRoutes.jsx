import { Routes, Route } from "react-router-dom";

// Customer pages
import Home from "../pages/customer/Home";
import ProductDetails from "../pages/customer/ProductDetails";
import Categories from "../pages/customer/Categories";
import SearchResults from "../pages/customer/SearchResults";
import NotFound from "../pages/customer/NotFound";

// Admin pages
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import ManageProducts from "../pages/admin/ManageProducts";
import Settings from "../pages/admin/Settings";
import ChangePassword from "../pages/admin/ChangePassword";

// Layout & guards
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = ({ children }) => (
  <ProtectedRoute>
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <span className="admin-header__title">LuxBag Admin Panel</span>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Store Management</span>
        </div>
        {children}
      </div>
    </div>
  </ProtectedRoute>
);

const CustomerLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <FloatingWhatsApp />
  </>
);

const AppRoutes = () => (
  <Routes>
  
    <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
    <Route path="/product/:id" element={<CustomerLayout><ProductDetails /></CustomerLayout>} />
    <Route path="/categories" element={<CustomerLayout><Categories /></CustomerLayout>} />
    <Route path="/categories/:slug" element={<CustomerLayout><Categories /></CustomerLayout>} />
    <Route path="/search" element={<CustomerLayout><SearchResults /></CustomerLayout>} />

  
    <Route path="/admin/login" element={<AdminLogin />} />

  
    <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
    <Route path="/admin/products" element={<AdminLayout><ManageProducts /></AdminLayout>} />
    <Route path="/admin/add-product" element={<AdminLayout><AddProduct /></AdminLayout>} />
    <Route path="/admin/edit-product/:id" element={<AdminLayout><EditProduct /></AdminLayout>} />
    <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
    <Route path="/admin/change-password" element={<AdminLayout><ChangePassword /></AdminLayout>} />

  
    <Route path="*" element={<CustomerLayout><NotFound /></CustomerLayout>} />
  </Routes>
);

export default AppRoutes;