import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export const CATEGORIES = [
  { name: "Handbags", icon: "👜", slug: "handbags" },
  { name: "Dresses", icon: "👗", slug: "dresses" },
  { name: "Shoes", icon: "👠", slug: "shoes" },
  { name: "Accessories", icon: "💍", slug: "accessories" },
  { name: "Tops", icon: "👚", slug: "tops" },
  { name: "Trousers", icon: "👖", slug: "trousers" },
  { name: "Jackets", icon: "🧥", slug: "jackets" },
  { name: "Skirts", icon: "🩱", slug: "skirts" },
];

const CategoryCard = ({ category, active, count }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`category-card ${active ? "active" : ""}`}
      onClick={() => navigate(`/categories/${category.slug}`)}
    >
      <div className="category-card__icon">{category.icon}</div>
      <div className="category-card__name">{category.name}</div>
      {count !== undefined && <div className="category-card__count">{count} items</div>}
    </div>
  );
};

export default CategoryCard;