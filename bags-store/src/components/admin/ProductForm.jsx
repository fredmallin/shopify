import { useState } from "react";
import UploadImage from "./UploadImage";
import UploadVideo from "./UploadVideo";
import { CATEGORIES } from "../CategoryCard";
import "../../styles/admin.css";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const COLORS = ["Black", "White", "Brown", "Beige", "Navy", "Red", "Pink", "Gold", "Silver", "Multicolor"];

const ProductForm = ({ initial = {}, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    price: initial.price || "",
    category: initial.category || "",
    description: initial.description || "",
    sizes: initial.sizes || [],
    colors: initial.colors || [],
    inStock: initial.inStock !== false,
  });
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (k, val) => set(k, form[k].includes(val) ? form[k].filter(x => x !== val) : [...form[k], val]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, imageFiles: images, videoFile: video });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Product Name *</label>
          <input className="form-control" required value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Classic Leather Tote" />
        </div>
        <div className="form-group">
          <label>Price (KES) *</label>
          <input className="form-control" required type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. 3500" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category *</label>
          <select className="form-control" required value={form.category} onChange={e => set("category", e.target.value)}>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" value={form.inStock ? "true" : "false"} onChange={e => set("inStock", e.target.value === "true")}>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control" rows={4} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe the product…" />
      </div>

      <div className="form-group">
        <label>Available Sizes</label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          {SIZES.map(s => (
            <button key={s} type="button" onClick={() => toggleArr("sizes", s)}
              style={{ padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", border: "2px solid", transition: "0.2s",
                background: form.sizes.includes(s) ? "var(--primary)" : "transparent",
                borderColor: form.sizes.includes(s) ? "var(--primary)" : "var(--border)",
                color: form.sizes.includes(s) ? "#fff" : "var(--text-muted)",
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Available Colors</label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          {COLORS.map(c => (
            <button key={c} type="button" onClick={() => toggleArr("colors", c)}
              style={{ padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", border: "2px solid", transition: "0.2s",
                background: form.colors.includes(c) ? "var(--secondary)" : "transparent",
                borderColor: form.colors.includes(c) ? "var(--secondary)" : "var(--border)",
                color: form.colors.includes(c) ? "#fff" : "var(--text-muted)",
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Product Images</label>
        <UploadImage files={images} onChange={setImages} existingUrls={initial.images} />
      </div>

      <div className="form-group">
        <label>Product Video (optional)</label>
        <UploadVideo file={video} onChange={setVideo} existingUrl={initial.video} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: "0.5rem", width: "100%", justifyContent: "center" }}>
        {loading ? "Saving…" : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;