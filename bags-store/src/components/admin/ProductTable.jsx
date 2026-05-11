import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";
import "../../styles/admin.css";

const ProductTable = ({ products = [], onDelete }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="data-table">
      <div style={{ padding: "1rem", display: "flex", gap: "1rem", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#f4f4f7", borderRadius: "8px", padding: "0.5rem 0.75rem", flex: 1 }}>
          <FiSearch color="var(--text-muted)" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            style={{ background: "transparent", border: "none", fontSize: "0.88rem", flex: 1 }}
          />
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{filtered.length} items</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No products found</td></tr>
            )}
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  {p.images?.[0]
                    ? <img className="data-table__img" src={p.images[0]} alt={p.name} />
                    : <div className="data-table__img" style={{ background: "#f3f0eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>👜</div>
                  }
                </td>
                <td><strong>{truncateText(p.name, 30)}</strong></td>
                <td><span className="badge badge-primary">{p.category}</span></td>
                <td style={{ fontWeight: 700, color: "var(--primary)" }}>{formatPrice(p.price)}</td>
                <td><code style={{ fontSize: "0.75rem", background: "#f4f4f7", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>{p.code}</code></td>
                <td>
                  <span className={`badge ${p.inStock !== false ? "badge-success" : "badge-danger"}`}>
                    {p.inStock !== false ? "In Stock" : "Out"}
                  </span>
                </td>
                <td>
                  <div className="data-table__actions">
                    <button className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }} onClick={() => navigate(`/admin/edit-product/${p.id}`)}>
                      <FiEdit2 />
                    </button>
                    <button className="btn btn-danger" style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }} onClick={() => onDelete(p.id, p.name)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;