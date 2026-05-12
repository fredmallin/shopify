import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardStats from "../../components/admin/DashboardStats";
import ProductTable from "../../components/admin/ProductTable";
import Loader from "../../components/Loader";
import { fetchAllProducts, removeProduct } from "../../services/productService";
import toast from "react-hot-toast";
import "../../styles/admin.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await removeProduct(id);
      toast.success("Product deleted");
      load();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="admin-main">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--secondary)" }}>Dashboard Overview</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Manage your store at a glance</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/admin/add-product")}>
          + Add Product
        </button>
      </div>

      <DashboardStats products={products} />

      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontWeight: 700, color: "var(--secondary)" }}>All Products</h3>
        <button className="btn btn-outline" style={{ fontSize: "0.85rem" }} onClick={load}>↻ Refresh</button>
      </div>

      {loading ? <Loader /> : <ProductTable products={products} onDelete={handleDelete} />}
    </div>
  );
};

export default Dashboard;