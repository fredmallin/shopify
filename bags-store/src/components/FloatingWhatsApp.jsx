import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { openWhatsAppGeneral } from "../services/whatsappService";

const FloatingWhatsApp = () => {
  const [dismissed, setDismissed] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  if (dismissed) return null;

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
      {tooltip && (
        <div style={{ background: "#fff", borderRadius: "12px", padding: "0.75rem 1rem", boxShadow: "var(--shadow)", fontSize: "0.85rem", maxWidth: "220px", position: "relative" }}>
          <button onClick={() => setTooltip(false)} style={{ position: "absolute", top: "4px", right: "6px", background: "none", color: "var(--text-muted)", fontSize: "0.75rem" }}>✕</button>
          <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Need help? 👋</p>
          <p style={{ color: "var(--text-muted)" }}>Chat with us on WhatsApp for orders & queries</p>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={() => setDismissed(true)}
          style={{ background: "rgba(0,0,0,0.1)", border: "none", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", cursor: "pointer" }}
        >
          <FiX size={14} />
        </button>
        <button
          onClick={openWhatsAppGeneral}
          style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: "#25D366", color: "#fff", border: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
            fontSize: "1.8rem", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;