import { useState, useEffect, useCallback } from "react";
import { fetchAllProducts, fetchByCategory, findProducts } from "../services/productService";

const useProducts = ({ category = null, search = "" } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (search.trim()) {
        data = await findProducts(search.trim());
      } else if (category) {
        data = await fetchByCategory(category);
      } else {
        data = await fetchAllProducts();
      }
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, refetch: load };
};

export default useProducts;