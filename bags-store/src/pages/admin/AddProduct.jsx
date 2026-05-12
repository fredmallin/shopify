import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import { createProduct } from "../../services/productService";
import { uploadImage, uploadVideo } from "../../services/cloudinaryService";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import "../../styles/admin.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ imageFiles, videoFile, ...data }) => {
    setLoading(true);
    try {
      const toastId = toast.loading("Uploading images…");

      const imageUrls = [];
      for (const file of imageFiles) {
        const url = await uploadImage(file);
        imageUrls.push(url);
      }

      let videoUrl = null;
      if (videoFile) {
        toast.loading("Uploading video…", { id: toastId });
        videoUrl = await uploadVideo(videoFile);
      }

      toast.loading("Saving product…", { id: toastId });
      const { addProduct } = await import("../../services/firestoreService");
      const code = "LB-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      await addProduct({ ...data, images: imageUrls, video: videoUrl, code });

      toast.success("Product added!", { id: toastId });
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-main">
      <button className="btn btn-outline" style={{ marginBottom: "1.5rem" }} onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--secondary)" }}>Add New Product</h2>
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Fill in the details below to list a new product</p>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddProduct;