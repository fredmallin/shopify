import { useRef } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import "../../styles/admin.css";

const UploadImage = ({ files = [], onChange, existingUrls = [] }) => {
  const inputRef = useRef(null);

  const handleFiles = (incoming) => {
    const newFiles = [...incoming].filter(f => f.type.startsWith("image/")).slice(0, 6 - files.length);
    onChange([...files, ...newFiles]);
  };

  const remove = (i) => onChange(files.filter((_, idx) => idx !== i));

  return (
    <div>
      <div
        className="upload-zone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
        onDragLeave={(e) => e.currentTarget.classList.remove("dragover")}
        onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove("dragover"); handleFiles(e.dataTransfer.files); }}
      >
        <div className="upload-zone__icon"><FiUploadCloud /></div>
        <p><strong>Click to upload</strong> or drag & drop images</p>
        <p style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>PNG, JPG up to 10MB each · max 6 images</p>
        <input ref={inputRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
      </div>

      {existingUrls?.length > 0 && (
        <div style={{ marginTop: "0.75rem" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Existing images:</p>
          <div className="upload-previews">
            {existingUrls.map((url, i) => (
              <div key={i} className="upload-preview">
                <img src={url} alt={`Existing ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="upload-previews" style={{ marginTop: "0.75rem" }}>
          {files.map((file, i) => (
            <div key={i} className="upload-preview">
              <img src={URL.createObjectURL(file)} alt={`Preview ${i + 1}`} />
              <button className="upload-preview__remove" type="button" onClick={() => remove(i)}><FiX size={10} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;