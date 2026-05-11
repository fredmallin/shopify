const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export const openWhatsApp = (product) => {
  const message = `Hello! I'm interested in ordering:\n\n*${product.name}*\nPrice: KES ${product.price?.toLocaleString()}\nCode: ${product.code || "N/A"}\n\nPlease confirm availability. Thank you!`;
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
};

export const openWhatsAppGeneral = () => {
  const message = `Hello! I'm browsing your store and would like some assistance. `;
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
};