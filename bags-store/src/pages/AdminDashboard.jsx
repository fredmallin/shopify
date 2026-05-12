import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import axios from "axios";

function AdminDashboard() {
  // =========================
  // STATES
  // =========================
  const [form, setForm] = useState({
    name: "",
    price: "",
    number: "",
    image: "",
    description: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(items);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // =========================
  // CLOUDINARY IMAGE UPLOAD
  // =========================
  const uploadImage = async (file) => {
    if (!file) return;

    setLoading(true);

    try {
      const data = new FormData();

      data.append("file", file);

      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await axios.post(
        import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
        data
      );

      setForm((prev) => ({
        ...prev,
        image: res.data.secure_url,
      }));

      alert("Image uploaded successfully!");
    } catch (err) {
      console.log("Upload error:", err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD OR UPDATE PRODUCT
  // =========================
  const addProduct = async () => {
    if (!form.name || !form.price || !form.image) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // UPDATE PRODUCT
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), {
          ...form,
          price: Number(form.price),
        });

        alert("Product updated successfully!");
        setEditingId(null);
      }

      // ADD PRODUCT
      else {
        await addDoc(collection(db, "products"), {
          ...form,
          price: Number(form.price),
        });

        alert("Product added successfully!");
      }

      // RESET FORM
      setForm({
        name: "",
        price: "",
        number: "",
        image: "",
        description: "",
      });

      // REFRESH PRODUCTS
      fetchProducts();
    } catch (err) {
      console.log("Firestore error:", err);
      alert("Something went wrong");
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));

      alert("Product deleted successfully!");

      fetchProducts();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // =========================
  // START EDITING
  // =========================
  const startEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      number: product.number || "",
      image: product.image || "",
      description: product.description || "",
    });

    setEditingId(product.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // UI
  // =========================
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <h1>Admin Dashboard</h1>

      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>
          {editingId ? "Update Product" : "Add New Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.number}
          onChange={(e) =>
            setForm({ ...form, number: e.target.value })
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        {/* IMAGE INPUT */}
        <input
          type="file"
          onChange={(e) => uploadImage(e.target.files[0])}
          style={{ marginBottom: "15px" }}
        />

        {/* LOADING */}
        {loading && <p>Uploading image...</p>}

        {/* IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            width="150"
            style={{
              display: "block",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          />
        )}

        {/* BUTTON */}
        <button
          onClick={addProduct}
          disabled={loading}
          style={buttonStyle}
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* ========================= */}
      {/* PRODUCTS */}
      {/* ========================= */}
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3>{item.name}</h3>

              <p>
                <strong>Ksh:</strong> {item.price}
              </p>

              <p>{item.description}</p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => startEdit(item)}
                  style={{
                    ...buttonStyle,
                    background: "orange",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(item.id)}
                  style={{
                    ...buttonStyle,
                    background: "red",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =========================
// STYLES
// =========================
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#000",
  color: "#fff",
};

export default AdminDashboard;