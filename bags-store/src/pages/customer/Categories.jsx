import { useParams, useNavigate } from "react-router-dom";
import CategoryCard, { CATEGORIES } from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import useProducts from "../../hooks/useProducts";

const Categories = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts({ category: slug });

  const activeCategory = CATEGORIES.find(c => c.slug === slug);

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: "0.5rem" }}>
          {activeCategory ? `${activeCategory.icon} ${activeCategory.name}` : "All Categories"}
        </h1>
        <p className="section-subtitle">
          {slug ? `Showing all ${activeCategory?.name || slug} items` : "Browse all our product categories"}
        </p>

        {/* Category Selector */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <button
            className={`btn ${!slug ? "btn-primary" : "btn-outline"}`}
            onClick={() => navigate("/categories")}
          >All</button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              className={`btn ${slug === cat.slug ? "btn-primary" : "btn-outline"}`}
              onClick={() => navigate(`/categories/${cat.slug}`)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {!slug && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
            {CATEGORIES.map(cat => <CategoryCard key={cat.slug} category={cat} active={slug === cat.slug} />)}
          </div>
        )}

        {slug && (
          loading ? <Loader /> : products.length === 0 ? (
            <EmptyState icon={activeCategory?.icon || "🛍️"} title="No products yet" subtitle="Check back soon!" action={{ label: "Browse All", href: "/categories" }} />
          ) : (
            <div className="grid-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Categories;