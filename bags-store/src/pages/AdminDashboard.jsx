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
  // ====================
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
      const querySnapshot = await getDocs(
        collection(db, "products")
      );

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
        import.meta.env
          .VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await axios.post(
        import.meta.env
          .VITE_CLOUDINARY_UPLOAD_URL,
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
    if (
      !form.name ||
      !form.price ||
      !form.image
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // UPDATE PRODUCT
      if (editingId) {
        await updateDoc(
          doc(db, "products", editingId),
          {
            ...form,
            price: Number(form.price),
          }
        );

        alert("Product updated!");

        setEditingId(null);
      }

      // ADD PRODUCT
      else {
        await addDoc(
          collection(db, "products"),
          {
            ...form,
            price: Number(form.price),
            sold: false,
            offer: false,
          }
        );

        alert("Product added!");
      }

      // RESET FORM
      setForm({
        name: "",
        price: "",
        number: "",
        image: "",
        description: "",
      });

      // REFRESH
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
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(db, "products", id)
      );

      alert("Product deleted!");

      fetchProducts();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const startEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      number: product.number || "",
      image: product.image || "",
      description:
        product.description || "",
    });

    setEditingId(product.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // TOGGLE SOLD
  // =========================
  const toggleSold = async (item) => {
    try {
      await updateDoc(
        doc(db, "products", item.id),
        {
          sold: !item.sold,
        }
      );

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // TOGGLE OFFER
  // =========================
  const toggleOffer = async (item) => {
    try {
      await updateDoc(
        doc(db, "products", item.id),
        {
          offer: !item.offer,
        }
      );

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "40px",
        }}
      >
        Admin Dashboard
      </h1>

      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "40px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          {editingId
            ? "Update Product"
            : "Add Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.number}
          onChange={(e) =>
            setForm({
              ...form,
              number: e.target.value,
            })
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) =>
            uploadImage(
              e.target.files[0]
            )
          }
          style={{
            marginBottom: "20px",
          }}
        />

        {/* LOADING */}
        {loading && (
          <p>Uploading image...</p>
        )}

        {/* IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />
        )}

        {/* BUTTON */}
        <div>
          <button
            onClick={addProduct}
            disabled={loading}
            style={buttonStyle}
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* PRODUCTS */}
      {/* ========================= */}

      <h2
        style={{
          marginBottom: "20px",
          fontSize: "32px",
        }}
      >
        All Products
      </h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {/* OFFER BADGE */}
              {item.offer && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "red",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    zIndex: 10,
                  }}
                >
                  OFFER
                </div>
              )}

              {/* SOLD BADGE */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: item.sold
                    ? "green"
                    : "#222",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  zIndex: 10,
                }}
              >
                {item.sold
                  ? "SOLD"
                  : "AVAILABLE"}
              </div>

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              {/* CONTENT */}
              <div
                style={{
                  padding: "15px",
                }}
              >
                <h3>{item.name}</h3>

                <p
                  style={{
                    color: "#ff3c00",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Ksh {item.price}
                </p>

                <p
                  style={{
                    color: "#666",
                    minHeight: "50px",
                  }}
                >
                  {item.description}
                </p>

                {/* BUTTONS */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  {/* EDIT */}
                  <button
                    onClick={() =>
                      startEdit(item)
                    }
                    style={{
                      ...buttonStyle,
                      background:
                        "orange",
                    }}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      deleteProduct(
                        item.id
                      )
                    }
                    style={{
                      ...buttonStyle,
                      background: "red",
                    }}
                  >
                    Delete
                  </button>

                  {/* SOLD */}
                  <button
                    onClick={() =>
                      toggleSold(item)
                    }
                    style={{
                      ...buttonStyle,
                      background:
                        item.sold
                          ? "gray"
                          : "green",
                    }}
                  >
                    {item.sold
                      ? "Available"
                      : "Sold"}
                  </button>

                  {/* OFFER */}
                  <button
                    onClick={() =>
                      toggleOffer(item)
                    }
                    style={{
                      ...buttonStyle,
                      background:
                        "#ff3c00",
                    }}
                  >
                    {item.offer
                      ? "Remove Offer"
                      : "Offer"}
                  </button>
                </div>
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
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
};

export default AdminDashboard;