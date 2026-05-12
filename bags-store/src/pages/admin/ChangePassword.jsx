import { useState } from "react";
import { changeAdminPassword } from "../../services/authService";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiLock, FiCheck, FiX } from "react-icons/fi";
import "../../styles/admin.css";
import "../../styles/changePassword.css";

const req = (password) => ({
  length: password.length >= 8,
  upper: /[A-Z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
});

const Req = ({ met, label }) => (
  <div className={`change-pw__req ${met ? "met" : ""}`}>
    {met ? <FiCheck size={13} /> : <FiX size={13} />} {label}
  </div>
);

const ChangePassword = () => {
  const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPw: false, confirm: false });
  const [loading, setLoading] = useState(false);

  const reqs = req(form.newPw);
  const allMet = Object.values(reqs).every(Boolean);
  const matches = form.newPw === form.confirm;

  const toggle = (field) => setShow(s => ({ ...s, [field]: !s[field] }));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allMet) { toast.error("Password does not meet requirements"); return; }
    if (!matches) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    try {
      await changeAdminPassword(form.current, form.newPw);
      toast.success("Password changed successfully!");
      setForm({ current: "", newPw: "", confirm: "" });
    } catch (err) {
      toast.error(err.code === "auth/wrong-password" ? "Current password is incorrect" : "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, field, placeholder }) => (
    <div className="form-group">
      <label>{label}</label>
      <div className="change-pw__input-wrap">
        <input
          className="form-control"
          type={show[field] ? "text" : "password"}
          value={form[field]}
          onChange={e => set(field, e.target.value)}
          placeholder={placeholder}
          required
        />
        <button type="button" className="change-pw__toggle" onClick={() => toggle(field)}>
          {show[field] ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-main">
      <div className="change-pw">
        <div className="change-pw__card">
          <h2 className="change-pw__title"><FiLock /> Change Password</h2>

          <form onSubmit={handleSubmit}>
            <Field label="Current Password" field="current" placeholder="Enter current password" />
            <Field label="New Password" field="newPw" placeholder="Enter new password" />

            <div className="change-pw__requirements">
              <Req met={reqs.length} label="At least 8 characters" />
              <Req met={reqs.upper} label="One uppercase letter" />
              <Req met={reqs.number} label="One number" />
              <Req met={reqs.special} label="One special character" />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Field label="Confirm New Password" field="confirm" placeholder="Re-enter new password" />
              {form.confirm && (
                <p style={{ fontSize: "0.8rem", color: matches ? "#10b981" : "#ef4444", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  {matches ? <><FiCheck /> Passwords match</> : <><FiX /> Passwords do not match</>}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !allMet || !matches}
              style={{ width: "100%", justifyContent: "center", marginTop: "1.25rem" }}
            >
              {loading ? "Updating…" : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;