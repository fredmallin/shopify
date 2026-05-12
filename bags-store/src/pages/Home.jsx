import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));

        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(data);
      } catch (err) {
        console.log("Firestore error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2>Loading products...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="grid">
      {products.length === 0 ? (
        <h2>No products found</h2>
      ) : (
        products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))
      )}
    </div>
  );
}

export default Home;