import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <h2>👜 <span>LuxBag</span>Store</h2>
            <p>Premium bags and fashion clothing delivered to your door. Quality you can trust, style you'll love.</p>
          </div>
          <div className="footer__col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/search">Search</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/categories/handbags">Handbags</Link></li>
              <li><Link to="/categories/dresses">Dresses</Link></li>
              <li><Link to="/categories/shoes">Shoes</Link></li>
              <li><Link to="/categories/accessories">Accessories</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="https://wa.me/254700000000" target="_blank" rel="noreferrer">WhatsApp Us</a></li>
              <li><a href="mailto:hello@luxbagstore.com">Email Us</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} LuxBag Store. All rights reserved.</span>
          <div className="footer__socials">
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;