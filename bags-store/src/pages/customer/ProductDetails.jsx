import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../services/productService";
import ProductGallery from "../../components/ProductGallery";
import VideoPlayer from "../../components/VideoPlayer";
import WhatsAppButton from "../../components/WhatsAppButton";
import Loader from "../../components/Loader";
import { formatPrice } from "../../utils/formatPrice";
import { FiArrowLeft } from "react-icons/fi";
import "../../styles/product.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error || !product) return (
    <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
      <p style={{ color: "var(--text-muted)" }}>Product not found.</p>
      <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={() => navigate("/")}>Go Home</button>
    </div>
  );

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: "2rem", gap: "0.5rem" }}>
          <FiArrowLeft /> Back
        </button>
        <div className="product-detail__grid">
          <div>
            <ProductGallery images={product.images} video={product.video} />
            {product.video && <VideoPlayer src={product.video} />}
          </div>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>{product.category}</span>
            <h1 className="product-detail__name">{product.name}</h1>
            <div className="product-detail__price">{formatPrice(product.price)}</div>

            {product.description && (
              <p className="product-detail__desc">{product.description}</p>
            )}

            <div className="product-detail__meta">
              <div className="product-detail__meta-row">
                <span className="product-detail__meta-label">Code:</span>
                <code style={{ background: "#f3f0eb", padding: "0.1rem 0.5rem", borderRadius: "4px", fontSize: "0.85rem" }}>{product.code}</code>
              </div>
              <div className="product-detail__meta-row">
                <span className="product-detail__meta-label">Status:</span>
                <span className={`badge ${product.inStock !== false ? "badge-success" : "badge-danger"}`}>
                  {product.inStock !== false ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Available Sizes:</p>
                <div className="product-detail__tags">
                  {product.sizes.map(s => <span key={s} className="product-detail__tag">{s}</span>)}
                </div>
              </div>
            )}

            {product.colors?.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Available Colors:</p>
                <div className="product-detail__tags">
                  {product.colors.map(c => <span key={c} className="product-detail__tag">{c}</span>)}
                </div>
              </div>
            )}

            <div className="product-detail__actions">
              <WhatsAppButton product={product} size="large" />
              <button className="btn btn-outline" onClick={() => navigate("/categories")}>Browse More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;