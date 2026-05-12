import { useRef } from "react";
import { FiFilm, FiX } from "react-icons/fi";
import "../../styles/admin.css";

const UploadVideo = ({ file, onChange, existingUrl }) => {
  const inputRef = useRef(null);

  return (
    <div>
      {!file && (
        <div className="upload-zone" onClick={() => inputRef.current?.click()}>
          <div className="upload-zone__icon"><FiFilm /></div>
          <p><strong>Click to upload video</strong></p>
          <p style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>MP4, MOV, WEBM up to 100MB</p>
          <input ref={inputRef} type="file" accept="video/*" style={{ display: "none" }} onChange={e => onChange(e.target.files[0])} />
        </div>
      )}

      {existingUrl && !file && (
        <div style={{ marginTop: "0.75rem" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Current video:</p>
          <video src={existingUrl} controls style={{ width: "100%", maxHeight: "200px", borderRadius: "8px" }} />
        </div>
      )}

      {file && (
        <div style={{ position: "relative", marginTop: "0.75rem" }}>
          <video src={URL.createObjectURL(file)} controls style={{ width: "100%", maxHeight: "200px", borderRadius: "8px" }} />
          <button type="button" onClick={() => onChange(null)}
            style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FiX size={14} />
          </button>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;