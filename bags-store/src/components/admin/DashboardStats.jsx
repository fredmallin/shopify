import "../../styles/admin.css";

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card">
    <div className="stat-card__icon" style={{ background: color + "22" }}>
      <span style={{ fontSize: "1.4rem" }}>{icon}</span>
    </div>
    <div>
      <div className="stat-card__num">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  </div>
);

const DashboardStats = ({ products = [] }) => {
  const total = products.length;
  const inStock = products.filter(p => p.inStock !== false).length;
  const categories = [...new Set(products.map(p => p.category))].length;
  const newest = products.slice(0, 5).length;

  return (
    <div className="stats-grid">
      <StatCard icon="📦" label="Total Products" value={total} color="#c8a96e" />
      <StatCard icon="✅" label="In Stock" value={inStock} color="#10b981" />
      <StatCard icon="🗂️" label="Categories" value={categories} color="#6366f1" />
      <StatCard icon="🆕" label="Recent Additions" value={newest} color="#f59e0b" />
    </div>
  );
};

export default DashboardStats;