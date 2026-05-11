import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import "../styles/hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <span className="hero__tag">✨ New Arrivals 2025</span>
          <h1 className="hero__title">
            Fashion That<br />
            <span>Tells Your</span><br />
            Story
          </h1>
          <p className="hero__subtitle">
            Discover premium bags, elegant dresses, and accessories curated for the modern woman. Order via WhatsApp for fast delivery.
          </p>
          <div className="hero__actions">
            <button className="btn btn-primary" onClick={() => navigate("/categories")}>
              Shop Now <FiArrowRight />
            </button>
            <button className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => navigate("/search")}>
              <FiSearch /> Search Products
            </button>
          </div>
          <div className="hero__stats">
            <div>
              <div className="hero__stat-num">500+</div>
              <div className="hero__stat-label">Products</div>
            </div>
            <div>
              <div className="hero__stat-num">2K+</div>
              <div className="hero__stat-label">Happy Customers</div>
            </div>
            <div>
              <div className="hero__stat-num">Fast</div>
              <div className="hero__stat-label">Delivery</div>
            </div>
          </div>
        </div>

        <div className="hero__img-wrap">
          <div className="hero__placeholder">👜</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;