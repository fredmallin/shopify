import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { FiSave, FiGlobe, FiPhone, FiInfo } from "react-icons/fi";
import "../../styles/admin.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: "LuxBag Store",
    whatsappNumber: "",
    storeDescription: "",
    instagramUrl: "",
    facebookUrl: "",
    currency: "KES",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "store"));
        if (snap.exists()) setSettings(prev => ({ ...prev, ...snap.data() }));
      } catch {
        toast.error("Could not load settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "store"), settings, { merge: true });
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  if (loading) return <div style={{ padding: "2rem" }}>Loading settings…</div>;

  return (
    <div className="admin-main">
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--secondary)" }}>Store Settings</h2>
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Configure your store details</p>

      <form className="form-card" onSubmit={handleSave} style={{ maxWidth: "640px" }}>

        <h4 style={{ fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiInfo /> General</h4>

        <div className="form-group">
          <label>Store Name</label>
          <input className="form-control" value={settings.storeName} onChange={e => set("storeName", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Store Description</label>
          <textarea className="form-control" rows={3} value={settings.storeDescription} onChange={e => set("storeDescription", e.target.value)} placeholder="Short description of your store…" />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select className="form-control" value={settings.currency} onChange={e => set("currency", e.target.value)}>
            <option value="KES">KES – Kenyan Shilling</option>
            <option value="USD">USD – US Dollar</option>
            <option value="GBP">GBP – British Pound</option>
            <option value="EUR">EUR – Euro</option>
          </select>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
        <h4 style={{ fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiPhone /> Contact</h4>

        <div className="form-group">
          <label>WhatsApp Number (with country code, no +)</label>
          <input className="form-control" value={settings.whatsappNumber} onChange={e => set("whatsappNumber", e.target.value)} placeholder="254700000000" />
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
        <h4 style={{ fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiGlobe /> Social Media</h4>

        <div className="form-group">
          <label>Instagram URL</label>
          <input className="form-control" value={settings.instagramUrl} onChange={e => set("instagramUrl", e.target.value)} placeholder="https://instagram.com/yourstore" />
        </div>
        <div className="form-group">
          <label>Facebook URL</label>
          <input className="form-control" value={settings.facebookUrl} onChange={e => set("facebookUrl", e.target.value)} placeholder="https://facebook.com/yourstore" />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: "0.5rem" }}>
          <FiSave /> {saving ? "Saving…" : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;