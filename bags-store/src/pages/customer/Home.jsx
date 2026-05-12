import Hero from "../../components/Hero";
import CategoryCard, { CATEGORIES } from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import SearchBar from "../../components/SearchBar";
import useProducts from "../../hooks/useProducts";
import "../../styles/home.css";

const Home = () => {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 8);

  return (
    <div>
      <Hero />

      {/* Search */}
      <section className="home__section" style={{ padding: "2rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
          <SearchBar />
        </div>
      </section>

      {/* Categories */}
      <section className="home__section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Browse our curated collections</p>
          <div className="categories-row">
            {CATEGORIES.map(cat => <CategoryCard key={cat.slug} category={cat} />)}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="home__section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked just for you</p>
          {loading ? <Loader /> : featured.length === 0 ? (
            <EmptyState icon="🛍️" title="Products coming soon" subtitle="Check back later for amazing items!" />
          ) : (
            <div className="grid-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="home__section">
        <div className="container">
          <div className="home__cta">
            <div>
              <h2>Order on WhatsApp 💬</h2>
              <p>See something you love? Chat with us directly for fast, secure ordering and delivery.</p>
            </div>
            <button className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2rem", whiteSpace: "nowrap" }}
              onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`, "_blank")}>
              Chat Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;