import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import useProducts from "../../hooks/useProducts";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const { products, loading } = useProducts({ search: query });

  const handleSearch = (q) => {
    setQuery(q);
    setSearchParams(q ? { q } : {});
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="section-title">Search Products</h1>
        <p className="section-subtitle">Find bags, dresses, shoes and more</p>

        <div style={{ marginBottom: "2rem" }}>
          <SearchBar onSearch={handleSearch} inline />
        </div>

        {query && (
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            {loading ? "Searching…" : `${products.length} result${products.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
        )}

        {loading ? <Loader /> : !query ? (
          <EmptyState icon="🔍" title="Start searching" subtitle="Type a product name or category above" />
        ) : products.length === 0 ? (
          <EmptyState icon="" title={`No results for "${query}"`} subtitle="Try a different keyword or browse categories" action={{ label: "Browse Categories", href: "/categories" }} />
        ) : (
          <div className="grid-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;