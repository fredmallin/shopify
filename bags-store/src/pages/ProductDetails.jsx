import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "products", id));
      setProduct(snap.data());
    };

    fetch();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const orderNow = () => {
    window.open(
      `https://wa.me/254700000000?text=Hi, I want to order ${product.name} No ${product.number} Price ${product.price}`,
      "_blank"
    );
  };

  return (
    <div className="details">
      <h2>{product.name}</h2>
      <img src={product.image} alt="" />
      <p>{product.description}</p>

      <button onClick={orderNow}>Order Now</button>
    </div>
  );
}

export default ProductDetails;