import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/admin/ProductTable";
import Loader from "../../components/Loader";
import { fetchAllProducts, removeProduct } from "../../services/productService";
import toast from "react-hot-toast";
import "../../styles/admin.css";

const ManageProducts = () => {
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
    if (!window.confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    try {
      await removeProduct(id);
      toast.success(`"${name}" deleted`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch {
      toast.error("Could not delete product");
    }
  };

  return (
    <div className="admin-main">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--secondary)" }}>Manage Products</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{products.length} total products</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-outline" onClick={load} style={{ fontSize: "0.85rem" }}>↻ Refresh</button>
          <button className="btn btn-primary" onClick={() => navigate("/admin/add-product")}>+ Add Product</button>
        </div>
      </div>

      {loading ? <Loader /> : <ProductTable products={products} onDelete={handleDelete} />}
    </div>
  );
};

export default ManageProducts;