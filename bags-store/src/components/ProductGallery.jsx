import { useState } from "react";
import "../styles/product.css";

const ProductGallery = ({ images = [], video }) => {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const allMedia = [...images, ...(video ? ["__video__"] : [])];

  return (
    <div className="gallery">
      <div className="gallery__main">
        {showVideo && video ? (
          <video src={video} controls autoPlay style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : images[active] ? (
          <img src={images[active]} alt={`Product view ${active + 1}`} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "6rem", color: "#ccc" }}>👜</div>
        )}
      </div>

      {allMedia.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery__thumb ${!showVideo && active === i ? "active" : ""}`}
              onClick={() => { setActive(i); setShowVideo(false); }}
            >
              <img src={img} alt={`Thumb ${i + 1}`} />
            </div>
          ))}
          {video && (
            <div
              className={`gallery__thumb ${showVideo ? "active" : ""}`}
              onClick={() => setShowVideo(true)}
              style={{ background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <span style={{ fontSize: "1.5rem" }}>▶️</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;