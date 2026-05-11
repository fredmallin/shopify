import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice } from "../utils/formatPrice";
import { openWhatsApp } from "../services/whatsappService";
import "../styles/product.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const mainImg = product.images?.[0];

  const handleOrder = (e) => {
    e.stopPropagation();
    openWhatsApp(product);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-card__img-wrap">
        {mainImg ? (
          <img src={mainImg} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-card__placeholder">👜</div>
        )}
        {product.inStock === false && (
          <span className="product-card__badge" style={{ background: "#ef4444" }}>Out of Stock</span>
        )}
        {product.inStock !== false && (
          <span className="product-card__badge">New</span>
        )}
      </div>
      <div className="product-card__body">
        <div className="product-card__cat">{product.category}</div>
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <button className="product-card__wa-btn" onClick={handleOrder}>
            <FaWhatsapp /> Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;