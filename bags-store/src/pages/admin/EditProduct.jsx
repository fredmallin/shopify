import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import { fetchProductById, editProduct } from "../../services/productService";
import { uploadImage, uploadVideo } from "../../services/cloudinaryService";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import "../../styles/admin.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch(() => toast.error("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async ({ imageFiles, videoFile, ...data }) => {
    setSaving(true);
    try {
      const toastId = toast.loading("Saving changes…");

      let newImageUrls = [...(product.images || [])];
      for (const file of imageFiles) {
        const url = await uploadImage(file);
        newImageUrls.push(url);
      }

      let videoUrl = product.video;
      if (videoFile) {
        toast.loading("Uploading video…", { id: toastId });
        videoUrl = await uploadVideo(videoFile);
      }

      await editProduct(id, { ...data, images: newImageUrls, video: videoUrl });
      toast.success("Product updated!", { id: toastId });
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-main">
      <button className="btn btn-outline" style={{ marginBottom: "1.5rem" }} onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--secondary)" }}>Edit Product</h2>
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Update the details for <strong>{product?.name}</strong></p>
      {product && <ProductForm initial={product} onSubmit={handleSubmit} loading={saving} />}
    </div>
  );
};

export default EditProduct;