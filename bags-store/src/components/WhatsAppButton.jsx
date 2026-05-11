import { FaWhatsapp } from "react-icons/fa";
import { openWhatsApp } from "../services/whatsappService";

const WhatsAppButton = ({ product, size = "normal", label = "Order via WhatsApp" }) => {
  const isLarge = size === "large";
  return (
    <button
      className="btn"
      onClick={() => openWhatsApp(product)}
      style={{
        background: "#25D366", color: "#fff",
        fontSize: isLarge ? "1rem" : "0.875rem",
        padding: isLarge ? "0.9rem 2rem" : "0.65rem 1.25rem",
      }}
    >
      <FaWhatsapp size={isLarge ? 20 : 16} />
      {label}
    </button>
  );
};

export default WhatsAppButton;