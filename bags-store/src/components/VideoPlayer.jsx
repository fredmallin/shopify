// VideoPlayer.jsx
import { useRef, useState } from "react";
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";

const VideoPlayer = ({ src, poster }) => {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    if (playing) { ref.current.pause(); } else { ref.current.play(); }
    setPlaying(!playing);
  };

  if (!src) return null;

  return (
    <div style={{ borderRadius: "var(--radius)", overflow: "hidden", position: "relative", background: "#000", marginTop: "1rem" }}>
      <video
        ref={ref} src={src} poster={poster} muted={muted}
        onEnded={() => setPlaying(false)}
        style={{ width: "100%", maxHeight: "400px", display: "block" }}
      />
      <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.75rem" }}>
        <button onClick={toggle} style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "44px", height: "44px", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          {playing ? <FiPause /> : <FiPlay />}
        </button>
        <button onClick={() => setMuted(!muted)} style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "44px", height: "44px", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          {muted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;