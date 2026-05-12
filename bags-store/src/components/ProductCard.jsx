import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const nav = useNavigate();

  const orderNow = () => {
    window.open(
      `https://wa.me/254700000000?text=Hi, I want to order ${product.name} No ${product.number} Price ${product.price}`,
      "_blank"
    );
  };

  return (
    <div className="card">
      <img src={product.image} alt="" />
      <h3>{product.name} #{product.number}</h3>
      <p>Ksh {product.price}</p>

      <button onClick={orderNow}>Order</button>

      <button onClick={() => nav(`/product/${product.id}`)}>
        View Full Details
      </button>
    </div>
  );
}

export default ProductCard;